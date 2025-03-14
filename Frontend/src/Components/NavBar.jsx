import React from 'react';
import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

import { Tabs, Button, Modal, Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Login from '../Components/Login';
import Signup from '../Components/Signup';
import { useState } from 'react';

import Logo1 from '../Images/Logo1.jpg'
import { useNavigate } from 'react-router-dom';


  
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar() {

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
  }

  const [open, setOpen] = useState(false);
  const [activeKey, setActiveKey] = useState("1");

  const showModal = () => {
      setOpen(true);
  };

  const handleOk = (e) => {
      console.log(e);
      setOpen(false);
  };

  const handleCancel = (e) => {
      console.log(e);
      setOpen(false);
  };

  const onChange = (key) => {
      setActiveKey(key);
  };

  const navigation = [

    { name: 'Home', href: '/', current: false },
    { name: 'Cart', href: '/cart', current: false },
    { name: 'Orders', href: '/orders', current: false },
  ]
  
  const navigation1 = [
  
    { name: 'Home', href: '/', current: false },
    { name: 'Cart', current: false, onclick: {showModal} },
    { name: 'Orders',current: false, onclick: {showModal}  },
  ]

  const items = [
        {
            key: "1",
            label: "Login",
            children: <Login />
        },
        {
            key: "2",
            label: "Signup",
            children: <Signup />
        }
    ];

  const [hover, setHover] = useState(false);

  return (
    <Disclosure as="nav" className="bg-orange-600 ">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="group relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                </Disclosure.Button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center">
                <img
                    alt="Your Company"
                    src={Logo1}
                    className="h-8 w-auto"
                />
                </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {token ?
                  <div className='mt-1'>
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? 'page' : undefined}
                      className={classNames(
                        item.current ? 'bg-orange-600 text-white' : 'text-white hover:bg-[#b91c1c] hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium',
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div> :
                  <div className='mt-1'>
                    {navigation1.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                          item.current ? 'bg-orange-600 text-white' : 'text-white hover:bg-[#b91c1c] hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium',
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  }
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            { token ?
              <button type="button" class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
              <span class="absolute -inset-1.5"></span>
              <span class="sr-only">View notifications</span>
              <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
              </svg>
            </button> : 

            <Button type="primary" onClick={showModal}  onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
              style={{
                backgroundColor: hover ? '#dc2626' : '#b91c1c', // Red shades from Tailwind palette
                borderColor: hover ? '#dc2626' : '#b91c1c',
            }}>
                Login
            </Button>}
            <Modal
                title="User Authentication"
                open={open}
                onCancel={handleCancel}
                footer={null}
                width={500}
                closable={false}
            >
                <Tabs
                    activeKey={activeKey}
                    onChange={onChange}
                    defaultActiveKey="1"
                    centered
                    items={items}
                />
            </Modal>            

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              {
                token? 
                <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                  <span className="absolute -inset-1.5" />
                  <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" /> 
                </MenuButton>
                </div>
                  : 
                <div>
                  <span className="absolute -inset-1.5" />
                  <Avatar
                    style={{
                      backgroundColor: '#b91c1c',
                      borderColor: '#ffffff',
                      borderWidth: 2,
                    }}
                    icon={<UserOutlined />}
                  />
                </div>
              }
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <MenuItem>
                  <a
                    href="/account"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    onClick={handleLogout}
                  >
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <Disclosure.Panel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
            {navigation.map((item) => (
            <Disclosure.Button
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? 'page' : undefined}
                className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-white hover:bg-gray-100 hover:text-white',
                item.name === 'Dashboard' ? 'hover:bg-blue-500' : '',
                'block rounded-md px-3 py-2 text-base font-medium',
                )}
            >
                {item.name}
            </Disclosure.Button>
            ))}
        </div>
    </Disclosure.Panel>
    </Disclosure>
  )
}
