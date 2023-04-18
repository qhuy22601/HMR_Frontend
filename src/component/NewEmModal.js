import { Button, Modal,Form, Input } from 'antd';
import { useState, useEffect, useRef } from 'react';




function NewEmModal(props) {
    const fmEm = useRef();

    
    
    useEffect(() => {
        if(props.action == "EDIT" && props.dataEdit.id){
            fmEm.current?.setFieldsValue({
                ...props.dataEdit,
            });
        }
        else{
            fmEm.current?.resetFields();
        }
    }, [props.dataEdit]);

    async function onSave(){
        const data = await fmEm.current?.validateFields();
        if(data != null){
            await props.save(data);
        }
        await fmEm.current?.resetFields();
    }

  return (
    <>
      <Modal
        open={props.visible}
        title={props.action}
        onOk={onSave}
        footer={[
        <Button key="submit" type="primary" onClick={onSave}>
            Add
          </Button>,
          <Button key="back" onClick={props.hiddenModal} >
            Cancel
          </Button>,
        ]}
      >
        <Form ref ={fmEm} autoComplete="off">
        {props.action==="EDIT" && (
            <Form.Item label="Id" name="id" hidden>
                <Input autoComplete='false'></Input>
            </Form.Item>
        )}

            {(props.action==="EDIT")
            ?(<div><Form.Item
        label="Id"
        name="id"
        // rules={[
        // {
        //     required: true,
        // },
        // ]}
        style={{display: 'none'}}
    >
        <Input />
    </Form.Item>
            <Form.Item
        label="UserName"
        name="username"
        rules={[
        {
            required: true,
        },
        ]}
    >
        <Input />
    </Form.Item></div>)
            :(<div>
                <Form.Item
        label="Id"
        name="id"
        // rules={[
        // {
        //     required: true,
        // },
        // ]}
        style={{display: 'none'}}
    >
        <Input />
    </Form.Item>
            <Form.Item
        label="UserName"
        name="username"
        rules={[
        {
            required: true,
        },
        ]}
    >
        <Input />
    </Form.Item>
    <Form.Item
        label="Email"
        name="email"
        rules={[
        {
            required: true,
        },
        ]}
    >
        <Input />
    </Form.Item>
    <Form.Item
        label="Password"
        name="password"
        rules={[
        {
            required: true,
        },
        ]}
    >
        <Input />
    </Form.Item>
    <Form.Item
        label="Level"
        name="payGrade"
        rules={[
        {
            required: true,
        },
        ]}
    >
        <Input />
    </Form.Item>
    <Form.Item
        label="Role"
        name="role"
        rules={[
        {
            required: true,
        },
        ]}
    >
        <Input />
    </Form.Item>
            </div>)
        }

        {/* <Form.Item
        label="Id"
        name="id"
        // rules={[
        // {
        //     required: true,
        // },
        // ]}
        style={{display: 'none'}}
    >
        <Input />
    </Form.Item>
            <Form.Item
        label="UserName"
        name="username"
        rules={[
        {
            required: true,
        },
        ]}
    >
        <Input />
    </Form.Item> */}
        
       

    </Form>
      </Modal>
    </>
  );
};
export default NewEmModal;