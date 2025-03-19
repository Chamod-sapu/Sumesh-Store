import React, { useState } from 'react'
import { Timeline } from 'antd';

import StoreImage from '../Images/StoreImage.png'

function About() {
    const [mode, setMode] = useState('left');

    return (
        <div>
            <div className='flex flex-col lg:flex-row justify-start lg:mx-60 mx-4 mt-10 lg:mt-28 lg:h-[400px]'>
                <div>
                    <p className='font-mono font-bold text-3xl lg:text-5xl'> About Us </p>
                    <p className='pt-7 w-full lg:w-[500px]'>
                        Routing protocols can be broadly categorized into distance-vector, link-state, and path-vector protocols. Distance-vector protocols (e.g., RIP, EIGRP) determine the best path based on hop count and periodically share routing tables with neighbors, making them simple but slower to converge. Link-state protocols (e.g., OSPF, IS-IS) use a detailed map of the network topology, calculating the shortest path using algorithms like Dijkstra's. They converge faster and are more scalable but require more resources. Path-vector protocols (e.g., BGP) focus on policy-based routing and are used primarily for inter-domain routing, exchanging path information between autonomous systems. While distance-vector protocols are easier to implement, link-state and path-vector protocols offer greater efficiency and scalability for larger, more complex networks.
                    </p>
                </div>
                <div className='w-full lg:w-[400px] mt-10 lg:mt-20 lg:ml-52'>
                    <img src={StoreImage} alt="Store Image" className='w-full lg:w-[400px]' />
                </div>
            </div>
            <div className='mx-4 lg:mx-60 mt-10'>
                <Timeline
                    mode={mode}
                    items={[
                        {
                            label: '2015-09-01',
                            children: 'Create a services',
                            color: 'orange'
                        },
                        {
                            label: '2015-09-01 09:12:11',
                            children: 'Solve initial network problems',
                            color: 'orange'
                        },
                        {
                            children: 'Technical testing',
                            color: 'orange'
                        },
                        {
                            label: '2015-09-01 09:12:11',
                            children: 'Network problems being solved',
                            color: 'orange'
                        },
                    ]}
                />
            </div>
        </div>
    )
}

export default About