import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  IconButton,
  Flex,
} from '@chakra-ui/react';
import { Smile, ImagePlus, Paperclip, Mic, Square } from 'lucide-react';
import { useRef, useState } from 'react';
import { auth, db, storage } from '@/config/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
interface ChatInputProps {
  scrollRef: React.RefObject<HTMLDivElement | null>; // Type for scrollRef
}
export default function ChatInput({ scrollRef }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const handleSendMessage = async () => {
    const user = auth.currentUser;
    if (!user) return;
    if (user) {
      message.trim();
      await addDoc(collection(db, 'chats'), {
        text: message,
        name: user.displayName || 'Anonymous',
        avatar: user.photoURL || '',
        uid: user.uid,
        createdAt: serverTimestamp(),
      });
      setMessage('');
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleRecording = async () => {
    if (!isRecording) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const fileRef = ref(
          storage,
          `voice_notes/${Date.now()}-${auth.currentUser?.uid}.webm`
        );
        await uploadBytes(fileRef, blob);
        const url = await getDownloadURL(fileRef);

        await addDoc(collection(db, 'chats'), {
          type: 'voice',
          audioUrl: url,
          name: auth.currentUser?.displayName || 'Anonymous',
          avatar: auth.currentUser?.photoURL || '',
          uid: auth.currentUser?.uid,
          createdAt: serverTimestamp(),
        });
      };

      mediaRecorder.start();
      setIsRecording(true);
    } else {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    }
  };

  return (
    <InputGroup size='md' mt={3}>
      <InputLeftAddon bg='gray.600' border='none' cursor='pointer'>
        <Smile size={18} />
      </InputLeftAddon>
      <Input
        placeholder='Type a message...'
        border='none'
        bg='gray.600'
        color='white'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
      />
      <InputRightAddon bg='gray.600' border='none'>
        <Flex gap={2}>
          <IconButton
            icon={<ImagePlus size={18} />}
            aria-label='Attach image'
            variant='ghost'
            size='sm'
          />
          <IconButton
            icon={<Paperclip size={18} />}
            aria-label='Attach file'
            variant='ghost'
            size='sm'
          />
          <IconButton
            icon={isRecording ? <Square /> : <Mic size={18} />}
            aria-label='Voice message'
            variant='ghost'
            size='sm'
            onClick={handleToggleRecording}
            colorScheme={isRecording ? 'red' : 'gray'}
          />
        </Flex>
      </InputRightAddon>
    </InputGroup>
  );
}
