'use client';
import React, { useEffect, useState } from 'react';
import {
  BookOpenText,
  Dot,
  Laptop,
  Shapes,
  Smile,
  TableOfContents,
  Webhook,
} from 'lucide-react';
import {
  useDisclosure,
  Link,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Radio,
  RadioGroup,
  Stack,
  Button,
  Text,
  Box,
} from '@chakra-ui/react';
import Search from '@/components/Search';
import { Product } from '@/lib/utils';

const categoryOptions = [
  { label: 'all', icon: <Shapes /> },
  { label: 'beauty', icon: <Webhook /> },
  { label: 'skin-care', icon: <BookOpenText /> },
  { label: 'smartphones', icon: <Smile /> },
  { label: 'mens-shirts', icon: <Laptop /> },
  { label: 'womens-dresses', icon: <Laptop /> },
  { label: 'sports-accessories', icon: <Laptop /> },
];

const sortOptions = [
  { label: 'Newest', icon: <Shapes /> },
  { label: 'Price:High-Low', icon: <Webhook /> },
  { label: 'Price:Low-High', icon: <BookOpenText /> },
  { label: 'Discounted', icon: <Smile /> },
];
export default function Shop() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedByGender, setSelectedByGender] = useState('All');
  const [selectedByPrice, setSelectedByPrice] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('Newest');
  const [displayProducts, setDisplayProduct] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const requestAllProducts = await fetch('https://dummyjson.com/products');
      const requestByCategory = await fetch(
        `https://dummyjson.com/products/category/${selectedCategory}`
      );
      const responseToAllProducts: { products: Product[] } =
        await requestAllProducts.json();
      const responseByCategory: { products: Product[] } =
        await requestByCategory.json();
      const productToDisplay = responseToAllProducts.products;
      let categoryToDisplay = responseByCategory.products;
      if (selectedCategory === 'all') {
        setDisplayProduct(productToDisplay);
      }
      if (selectedCategory !== 'all') {
        categoryToDisplay = categoryToDisplay.filter(
          (product) => product.category === selectedCategory
        );
        setDisplayProduct(categoryToDisplay);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  // const filteredByCategory =
  //   selectedCategory === 'All'
  //     ? products
  //     : products.filter((product) => product.category === selectedCategory);

  // const filteredByGenderAndPrice = filteredByCategory.filter((product) => {
  //   const genderMatch =
  //     selectedByGender === 'All' || product.gender === selectedByGender;
  //   const priceMatch =
  //     selectedByPrice === 'All' ||
  //     (selectedByPrice === '0-50' &&
  //       product.price >= 0 &&
  //       product.price <= 50) ||
  //     (selectedByPrice === '50-100' &&
  //       product.price > 50 &&
  //       product.price <= 100) ||
  //     (selectedByPrice === '100-200' &&
  //       product.price > 100 &&
  //       product.price <= 200) ||
  //     (selectedByPrice === 'Over200' && product.price > 200);

  //   return genderMatch && priceMatch;
  // });
  // const sortedProducts = [...filteredByGenderAndPrice];

  // if (selectedSort === 'Price:High-Low') {
  //   sortedProducts.sort((a, b) => b.price - a.price);
  // } else if (selectedSort === 'Price:Low-High') {
  //   sortedProducts.sort((a, b) => a.price - b.price);
  // } else if (selectedSort === 'Discounted') {
  //   sortedProducts.sort((a, b) => {
  //     if (a && !b) {
  //       return -1;
  //     } else if (!a && b) {
  //       return 1;
  //     } else {
  //       return 0;
  //     }
  //   });
  // } else {
  //   return selectedSort;
  // }

  return (
    <div>
      <p className='text-3xl'>Shop</p>
      <div className='flex items-center'>
        <Link href='/dashboard' _hover={{ color: 'blue.500' }}>
          Home
        </Link>
        <Dot size={28} />
        <p>Shop</p>
      </div>
      <div>
        <>
          <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
              <DrawerBody>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
        <div className='flex p-5 bg-custom-bg rounded-xl'>
          <div className='bg-red-400 border-r-4 border-purple-500 max-[980px]:hidden grow-1'>
            <section className='border-b-4 border-white'>
              <h1>Filter by category</h1>
              <ul className='flex flex-col justify-around'>
                {categoryOptions.map((option) => (
                  <li
                    key={option.label}
                    className='flex items-center gap-3 cursor-pointer'
                    onClick={() => setSelectedCategory(option.label)}
                  >
                    {option.icon} {option.label}
                  </li>
                ))}
              </ul>
            </section>
            <section className='border-b-4 border-white'>
              <h1>Sort by</h1>
              <ul className='flex flex-col justify-around'>
                {sortOptions.map((option) => (
                  <li
                    key={option.label}
                    className='flex items-center gap-3 cursor-pointer'
                    onClick={() => setSelectedSort(option.label)}
                  >
                    {option.icon} {option.label}
                  </li>
                ))}
              </ul>
            </section>
            <section className='border-b-4 border-white'>
              <h1>By Gender</h1>
              <RadioGroup
                onChange={setSelectedCategory}
                value={selectedCategory}
              >
                <Stack spacing={3}>
                  <Radio value='all'>All</Radio>
                  <Radio value='beauty'>Beauty</Radio>
                  <Radio value='skin-cares'>Skin-care</Radio>
                  <Radio value='smartphones'>Smartphones</Radio>
                  <Radio value='mens-shirts'>Mens-shirt</Radio>
                  <Radio value='womens-dresses'>Womens-shirt</Radio>
                  <Radio value='sports-accessories'>Sport-accessories</Radio>
                </Stack>
              </RadioGroup>
            </section>
            <section className='border-b-4 border-white'>
              <h1>By Pricing</h1>
              <RadioGroup onChange={setSelectedByPrice} value={selectedByPrice}>
                <Stack spacing={3}>
                  <Radio value='All'>All</Radio>
                  <Radio value='0-50'>0-50</Radio>
                  <Radio value='50-100'>50-100</Radio>
                  <Radio value='100-200'>100-200</Radio>
                  <Radio value='Over200'>Over200</Radio>
                </Stack>
              </RadioGroup>
            </section>
            <section className='border-b-4 border-white'>
              <h1>By Color</h1>
              <div className='flex items-center gap-3 break-all'>
                <div className='w-7 h-7 rounded-full bg-red-500'></div>
                <div className='w-7 h-7 rounded-full bg-blue-500'></div>
                <div className='w-7 h-7 rounded-full bg-purple-500'></div>
                <div className='w-7 h-7 rounded-full bg-green-500'></div>
                <div className='w-7 h-7 rounded-full bg-yellow-500'></div>
                <div className='w-7 h-7 rounded-full bg-brown-500'></div>
              </div>
            </section>
            <Button colorScheme='cyan'>Reset filter</Button>
          </div>
          <div className='bg-blue-500 grow-7'>
            <div className='flex justify-between items-center'>
              <span onClick={onOpen} className='min-[980px]:hidden'>
                <TableOfContents />
              </span>
              <h1 className='max-[980px]:hidden'>Product</h1>
              <Search />
            </div>
            {displayProducts.map((product) => (
              <Box
                key={product.id}
                borderWidth='1px'
                borderRadius='lg'
                padding='4'
                marginBottom='2'
              >
                <Stack spacing={2}>
                  <Text fontWeight='bold' fontSize='lg'>
                    {product.title}
                  </Text>
                  <Text>Category: {product.category}</Text>
                  <Text>Gender: {product.brand}</Text>
                  <Text>Price: ${product.price}</Text>
                </Stack>
              </Box>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
