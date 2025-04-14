'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import { Settings } from 'lucide-react';
import { useNav } from '@/context/ThemeContext';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Box,
  Heading,
  useColorMode,
  Button,
  HStack,
} from '@chakra-ui/react';
import { useThemeColor } from '@/lib/themeUtil';

function DasboardLayout({ children }: { children: React.ReactNode }) {
  const { isWide } = useNav();
  const contentMargin = isWide ? 'ml-20' : 'ml-55';
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { bgColor, childBgColor, textColor } = useThemeColor();
  const { colorMode, setColorMode } = useColorMode();
  const [changeTheme, setChangeTheme] = useState(colorMode === 'dark');
  useEffect(() => {
    setChangeTheme(colorMode === 'dark');
  }, [colorMode]);

  //rendering
  return (
    <Box className='flex min-h-screen' bg={bgColor} color={textColor}>
      <Box position='fixed' top='0' left='0' h='100vh' overflowY='scroll'>
        <Sidebar />
      </Box>
      <Box className={`${contentMargin} w-full max-[980px]:ml-0 `}>
        <Navbar />
        <main className='mx-2'>{children}</main>
        <Box
          className='flex justify-center items-center fixed bottom-10 right-9 bg-sky-600 cursor-pointer w-[50px] h-[50px] rounded-full'
          onClick={onOpen}
        >
          <Settings size={32} />
        </Box>
        <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bg={childBgColor} color={textColor}>
            <DrawerCloseButton />
            <DrawerHeader>Account Setting</DrawerHeader>
            <DrawerBody>
              <Heading>Theme</Heading>
              <HStack spacing={4}>
                <Button
                  onClick={() => setColorMode('light')}
                  colorScheme={!changeTheme ? 'blue' : 'gray'}
                  variant={!changeTheme ? 'solid' : 'outline'}
                >
                  Light Mode
                </Button>

                <Button
                  onClick={() => setColorMode('dark')}
                  colorScheme={changeTheme ? 'purple' : 'gray'}
                  variant={changeTheme ? 'solid' : 'outline'}
                >
                  Dark Mode
                </Button>
              </HStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </Box>
  );
}

export default DasboardLayout;
