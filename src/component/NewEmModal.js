import { Button, Modal,Form, Input, DatePicker, Select } from 'antd';
import { useState, useEffect, useRef } from 'react';
import imageCompression from "browser-image-compression";

const { Option } = Select;
export const Role = {
  ADMIN: "ADMIN",
  USER: "USER",
};

export const PayGrade = {
  INTERNSHIP: "INTERNSHIP",
  FRESHER: "FRESHER",
  JUNIOR: "JUNIOR",
  SENIOR: "SENIOR",
  VICEDIRECTOR: "VICEDIRECTOR",
  DIRECTOR: "DIRECTOR",
};
function NewEmModal(props) {
    const fmEm = useRef();

    const [image, setImage] = useState("");
    const [file, setFile] = useState(null);
    const [file64String, setFile64String] = useState(null);
    const [file64StringWithType, setFile64StringWithType] = useState(null);
    const [ava, setAva] = useState(localStorage.getItem("Avata"));
    
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
            data.birthDate = data.birthDate.format("YYYY-MM-DD");
            data.image = file64StringWithType;
            await props.save(data);
        }
        await fmEm.current?.resetFields();
    }

      function onUploadFileChange(e) {
        setFile64String(null);
        if (e.target.files < 1 || !e.target.validity.valid) {
          return;
        }
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImage(reader.result);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
        compressImageFile(e);
      }

      function fileToBase64(file, cb) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          cb(null, reader.result);
        };
        reader.onerror = function (error) {
          cb(error, null);
        };
      }

      async function compressImageFile(event) {
        const imageFile = event.target.files[0];

        const options = {
          maxWidthOrHeight: 250,
          useWebWorker: true,
        };
        try {
          const compressedFile = await imageCompression(imageFile, options);

          fileToBase64(compressedFile, (err, result) => {
            if (result) {
              setFile(result);
              setFile64StringWithType(result);
              setFile64String(String(result.split(",")[1]));
            }
          });
        } catch (error) {
          setFile64String(null);
        }
      }

  return (
    <>
      <Modal
        open={props.visible}
        title={props.action}
        onOk={onSave}
        footer={[
          <Button key="submit" type="primary" onClick={onSave}>
            Thêm
          </Button>,
          <Button key="back" onClick={props.hiddenModal}>
            Hủy
          </Button>,
        ]}
      >
        <Form ref={fmEm} autoComplete="off">
          {props.action === "EDIT" && (
            <Form.Item label="Id" name="id" hidden>
              <Input autoComplete="false"></Input>
            </Form.Item>
          )}

          {props.action === "EDIT" ? (
            <div>
              <Form.Item
                label="Id"
                name="id"
                // rules={[
                // {
                //     required: true,
                // },
                // ]}
                style={{ display: "none" }}
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
            </div>
          ) : (
            <div>
              <Form.Item
                label="Id"
                name="id"
                // rules={[
                // {
                //     required: true,
                // },
                // ]}
                style={{ display: "none" }}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Tên"
                name="firstName"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Họ"
                name="lastName"
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
                label="Mật khẩu"
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
                label="Ngày sinh"
                name="birthDate"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <DatePicker style={{ width: "300px" }} />
              </Form.Item>
              <Form.Item
                label="Giới tính"
                name="gender"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select style={{ width: "300px" }}>
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Cấp độ"
                name="payGrade"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select style={{ width: "300px" }}>
                  {Object.values(PayGrade).map((grade) => (
                    <Option key={grade} value={grade}>
                      {grade}
                    </Option>
                  ))}
                </Select>
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
                <Select style={{ width: "300px" }}>
                  {Object.values(Role).map((role) => (
                    <Option key={role} value={role}>
                      {role}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Ảnh"
                name="image"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={onUploadFileChange}
                />
              </Form.Item>
            </div>
          )}
        </Form>
      </Modal>
    </>
  );
};
export default NewEmModal;