import React from 'react'
import { List, Button } from 'antd'
import './HomePage.css'

const homePage = () => {

  const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ]

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            data
            <div style={{float: 'right', marginRight: "20px"}}>
              <Button>renew</Button>
            </div>
          </List.Item>
        )}
      />
    </div>
  )
}

export default homePage