'use client';
import PageTitle from '@/components/pageTitle';
import { useThemeColor } from '@/lib/themeUtil';
import {
  Box,
  Heading,
  Image,
  Stack,
  Stat,
  StatLabel,
  Text,
  List,
  ListItem,
  ListIcon,
  Button,
  Tag,
  Flex,
  Switch,
  useColorModeValue,
} from '@chakra-ui/react';
import { Check, X as Uncheck } from 'lucide-react';
import React from 'react';

export default function Pricing() {
  const { childBgColor } = useThemeColor();
  const planColor = useColorModeValue('black', 'white');

  return (
    <Box>
      <PageTitle />
      <Stack alignItems='center' my={5}>
        <Heading textAlign='center' color={planColor} maxW={600}>
          Flexible Plans Tailored to Fit Your Community&apos;s Unique Needs!
        </Heading>
        <Flex alignItems='center' mt={3} gap={2}>
          <Text fontWeight='bold'>Monthly</Text>
          <Switch />
          <Text fontWeight='bold'>Yearly</Text>
        </Flex>
      </Stack>
      <Stack
        direction={{ base: 'column', xxl: 'row' }}
        justifyContent='center'
        gap={9}
      >
        <Box
          display='flex'
          flexDirection='column'
          gap={7}
          bg={childBgColor}
          p={5}
          borderRadius='3xl'
        >
          <Text fontWeight='medium'>SILVER</Text>
          <Image
            width={100}
            src='https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/backgrounds/silver.png'
            alt='silver'
          />
          <Stat>
            <StatLabel fontSize='5xl' fontWeight='bold' color={planColor}>
              Free
            </StatLabel>
          </Stat>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={Check} color='green.500' />3 Members
            </ListItem>
            <ListItem>
              <ListIcon as={Check} color='green.500' />
              Single Devise
            </ListItem>
            <ListItem>
              <ListIcon as={Uncheck} color='green.500' />
              50GB Storage
            </ListItem>
            <ListItem>
              <ListIcon as={Uncheck} color='green.500' />
              Monthly Backups
            </ListItem>
            <ListItem>
              <ListIcon as={Uncheck} color='green.500' />
              Permissions & workflows
            </ListItem>
          </List>
          <Button
            width={{ base: 'full', xxl: 300 }}
            colorScheme='blue'
            borderRadius='3xl'
          >
            Choose Silver
          </Button>
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          gap={7}
          bg={childBgColor}
          p={5}
          borderRadius='3xl'
        >
          <Flex justifyContent='space-between' w='full'>
            <Text fontWeight='medium'>BRONZE</Text>
            <Tag bg='goldenrod' borderRadius='3xl'>
              POPULAR
            </Tag>
          </Flex>
          <Image
            width={100}
            src='https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/backgrounds/bronze.png'
            alt='bronze'
          />
          <Stat>
            <Flex alignItems='center'>
              <StatLabel fontSize='5xl' fontWeight='bold' color={planColor}>
                <sup>$</sup> 4.99
              </StatLabel>
              <p className='text-xl ml-3'> /mo</p>
            </Flex>
          </Stat>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={Check} color='green.500' />5 Members
            </ListItem>
            <ListItem>
              <ListIcon as={Check} color='green.500' />
              Single Devise
            </ListItem>
            <ListItem>
              <ListIcon as={Check} color='green.500' />
              80GB Storage
            </ListItem>
            <ListItem>
              <ListIcon as={Uncheck} color='green.500' />
              Monthly Backups
            </ListItem>
            <ListItem>
              <ListIcon as={Uncheck} color='green.500' />
              Permissions & workflows
            </ListItem>
          </List>
          <Button
            width={{ base: 'full', xxl: 300 }}
            colorScheme='blue'
            borderRadius='3xl'
          >
            Choose Bronze
          </Button>
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          gap={7}
          bg={childBgColor}
          p={5}
          borderRadius='3xl'
        >
          <Text fontWeight='medium'>GOLD</Text>
          <Image
            width={100}
            src='https://bootstrapdemos.wrappixel.com/spike/dist/assets/images/backgrounds/gold.png'
            alt='gold'
          />
          <Stat>
            <Flex alignItems='center'>
              <StatLabel fontSize='5xl' fontWeight='bold' color={planColor}>
                <sup>$</sup> 9.99
              </StatLabel>
              <p className='text-xl ml-3'> /mo</p>
            </Flex>
          </Stat>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={Check} color='green.500' />5 Members
            </ListItem>
            <ListItem>
              <ListIcon as={Check} color='green.500' />
              Single Devise
            </ListItem>
            <ListItem>
              <ListIcon as={Check} color='green.500' />
              120GB Storage
            </ListItem>
            <ListItem>
              <ListIcon as={Check} color='green.500' />
              Monthly Backups
            </ListItem>
            <ListItem>
              <ListIcon as={Check} color='green.500' />
              Permissions & workflows
            </ListItem>
          </List>
          <Button
            width={{ base: 'full', xxl: 300 }}
            colorScheme='blue'
            borderRadius='3xl'
          >
            Choose Gold
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
