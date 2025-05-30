import { Card } from 'antd'
import { LineChart } from '@mui/x-charts/LineChart';
import { Space, Table, Tag } from 'antd';


function Dashboard() {

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
            <>
                {tags.map(tag => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'loser') {
                    color = 'volcano';
                }
                return (
                    <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                    </Tag>
                );
                })}
            </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
            ),
        },
        ];
        const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];

return (
    <div>
        <div className="text-white flex justify-between items-center mb-4">

            <Card variant="borderless" style={{ width: 300, height: 160 }}>
            <p>Sales per day</p>
            <p>Card content</p>
            <p>Card content</p>
            </Card>

            <Card variant="borderless" style={{ width: 300, height: 160 }}>
            <p>Sales per Month</p>
            <p>Card content</p>
            <p>Card content</p>
            </Card>

            <Card variant="borderless" style={{ width: 300, height: 160 }}>
            <p>Orders per day</p>
            <p>Card content</p>
            <p>Card content</p>
            </Card>

            <Card variant="borderless" style={{ width: 300, height: 160 }}>
            <p>Orders per Month</p>
            <p>Card content</p>
            <p>Card content</p>
            </Card>

            <Card variant="borderless" style={{ width: 300, height: 160 }}>
            <p>Users Joined</p>
            <p>Card content</p>
            <p>Card content</p>
            </Card>

        </div>

        <div className=' mt-20 flex justify-between'>
            <div className='w-[750px] bg-white rounded-lg shadow-md'>
                <h1 className='font-bold text-lg text-blue-950 py-4 pl-6'>Sales Overview</h1>
                <LineChart
                    xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
                    series={[
                        {
                        data: [2, 3, 5.5, 8.5, 1.5, 5, 1, 4, 3, 8],
                        showMark: ({ index }) => index % 2 === 0,
                        },
                    ]}
                    height={400}
                />
            </div>

            <div className='w-[850px] bg-white rounded-lg shadow-md'>
                <p className='font-bold text-lg text-blue-950 py-4 pl-6'>Best Selling Items</p>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    </div>
  )
}

export default Dashboard
