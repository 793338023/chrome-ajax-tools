import {Modal} from 'antd';
import {FormOutlined} from '@ant-design/icons';
import {useRef, useState} from 'react';
import MonacoEditor from "../MonacoEditor";
import './index.css';

export default (props) => {
  let monacoEditorRef = useRef(null);
  const {
    language, request, responseText = "",
    onInterfaceListChange = () => {}
  } = props;
  const [visible, setVisible] = useState(false);

  const handleOk = () => {
    const { editorInstance } = monacoEditorRef.current;
    const editorValue = editorInstance.getValue();
    const language = editorInstance.getModel().getLanguageId();
    onInterfaceListChange('responseText', editorValue);
    onInterfaceListChange('language', language);
    setVisible(false);
  }
  return <>
    <FormOutlined
      onClick={(event) => {
        event.stopPropagation();
        setVisible(true);
      }}
      className="ajax-tools-iframe-resp-textarea-edit"
    />
    <Modal
      centered
      title={<span style={{fontSize: 12}}>匹配：{request}</span>}
      width={"98%"}
      visible={visible}
      onOk={handleOk}
      onCancel={() => setVisible(false)}
      okText="保存"
      cancelText="取消"
      bodyStyle={{
        padding: 12
      }}
    >
      <MonacoEditor
        ref={monacoEditorRef}
        text={responseText}
        language={language}
      />
    </Modal>
  </>;
}
