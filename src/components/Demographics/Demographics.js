import React from 'react';
import 'antd/dist/antd.css';
import { Button, Checkbox, Modal, Input, Typography, Space } from 'antd';
import './Demographics.css';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
const { Paragraph } = Typography;

export class Demographics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            warning: false,
            gender: null,
            okText: 'confirm',
            age: null
        };
        this.spanSize = 3;
        this.titleFontSize = 25;
        this.fontSize = 20;
    }


    copyTestingId() {
        navigator.clipboard.writeText(this.props.data.version + this.props.data.session_id)
            .then(res => console.log(`${this.props.data.version + this.props.data.session_id} copied`))
            .catch(err => console.log(err))

        this.setState({
            okText: 'Copied!'
        })
    }

    genderOnChange = (e: CheckboxChangeEvent) => {
        this.setState({
            gender: e.target.tabIndex
        })
    };

    ageOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value: inputValue } = e.target;
        this.setState({
            age: inputValue
        })
        console.log(inputValue)
    };

    handleOk = () => {
        this.setState({
            warning: false
        })
    };

    confirm = () => {
        const reg = /^[0-9]*$/;
        if (reg.test(this.state.age)) {
            this.saveToApi()
        } else {
            this.setState({
                warning: true
            })
        }
    }


    downloadJson(content, fileName) {
        var a = document.createElement("a");
        var file = new Blob([content], { type: 'text/plain' });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

    saveToApi = () => {
        console.log('saveToApi')
        const { data } = this.props;
        data['gender'] = `${this.state.gender}`;
        data['age'] = `${this.state.age}`;
        data['screen'] = `${screen.width}, ${screen.height}`;
        data['avail'] = `${screen.availHeight}, ${screen.availWidth}`;
        data['outer'] = `${window.outerHeight}, ${window.outerWidth}`;
        data['inner'] = `${window.innerHeight}, ${window.innerWidth}`;

        console.log(`Submitting the data: ${JSON.stringify(data, null, 2)}`);
        // this.downloadJson(JSON.stringify(data, null, 2), `${data.version + data.session_id + '_' + Date.now()}.json`);
        post(data, true).then(res => { }).catch(err => {
            console.log('failed to save the data', err)
        });
        this.setState({
            modalVisible: true,
        });
    }

    amazonClick
    render() {
        const { data } = this.props;
        return (
            <div className='mainArea'>
                <div className='main-text'>
                    <Paragraph style={{ fontSize: this.titleFontSize, }}>
                        What is your gender?
                    </Paragraph>

                    <Space direction="vertical">
                        <Checkbox checked={this.state.gender === 0} onChange={this.genderOnChange} tabIndex={0}>
                            <Paragraph style={{ fontSize: this.fontSize, }}>
                                Male
                            </Paragraph>
                        </Checkbox>

                        <Checkbox checked={this.state.gender === 1} onChange={this.genderOnChange} tabIndex={1}>
                            <Paragraph style={{ fontSize: this.fontSize, }}>
                                Female
                            </Paragraph>
                        </Checkbox>

                        <Checkbox checked={this.state.gender === 2} onChange={this.genderOnChange} tabIndex={2}>
                            <Paragraph style={{ fontSize: this.fontSize, }}>
                                No-binary / third gender
                            </Paragraph>
                        </Checkbox>

                        <Checkbox checked={this.state.gender === 3} onChange={this.genderOnChange} tabIndex={3}>
                            <Paragraph style={{ fontSize: this.fontSize, }}>
                                Prefer not to say
                            </Paragraph>
                        </Checkbox>
                    </Space>

                    <Paragraph style={{ fontSize: this.titleFontSize, }}>
                        What is your age? (please enter numbers only)
                    </Paragraph>
                    <Input onChange={this.ageOnChange}></Input>

                    <br />
                    <div className='closeButton'>
                        {(this.state.gender === null || this.state.age === null) ? <Button size="large" type="primary" disabled>Submit</Button> : <Button size="large" type="primary" onClick={this.confirm}>Submit</Button>}
                    </div>
                    <Modal
                        centered
                        visible={this.state.modalVisible}
                        onOk={() => this.copyTestingId()}
                        closable={false}
                        cancelButtonProps={{ disabled: true }}
                        okText={this.state.okText}
                    >
                        <p>
                            Thank you. Your response has been recorded.
                            <br />Your verification code is: <strong>{data.version + data.session_id}</strong>
                            <br />Enter this verification to get compensated on Prolific.
                        </p>
                    </Modal>
                    <Modal
                        visible={this.state.warning}
                        onCancel={this.handleOk}
                        footer={[
                            <Button type="primary" key="submit" onClick={this.handleOk}>ok</Button>
                        ]}
                    >Please enter your age in numbers
                    </Modal>
                </div>
            </div>
        )
    }
}