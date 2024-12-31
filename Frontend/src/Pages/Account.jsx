import React from 'react'
import { Descriptions, Button, Flex } from 'antd';

const items = [
    {
      label: 'UserName',
      children: 'Zhou Maomao',
    },
    {
      label: 'email',
      span: 'filled',
      // span = 2
      children: 'sumeshliyanarachci@gmail.com',
    },
    {
      label: 'Tel No.',
      span: 'filled',
      // span = 3
      children: '+9471 258 9631',
    },
    {
      label: 'Address',
      span: 1,
      // span will be 3 and warning for span is not align to the end
      children: <p>No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China </p>,
    },
  ];


function Account() {
  return (
    <div className='min-h-[450px]'>
        <div className='w-[1350px] ml-44 mt-10'>
            <Descriptions bordered title="User Info" items={items} />
        </div>
        <div className='w-[1350px] ml-44 mt-10'>
        <Button type="primary" danger className='ml-44 mr-5'>
            Edit Profile
        </Button>
        <Button type="primary" danger>
            Change the password
        </Button>
        </div>
    </div>
  )
}

export default Account