import React, {Component} from 'react';
import Chat from 'twilio-chat';
import ChatUI from './Chat.tsx'
import Preloader from "../preloader/Preloader";

class ChatApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoading: true,
            messages: [],
            message: '',
            users: [],
            user: null
        };

        this.user = {
            id: props.username,
            name: props.username
        };

        this.setupChatClient = this.setupChatClient.bind(this);
        this.messagesLoaded = this.messagesLoaded.bind(this);
        this.messageAdded = this.messageAdded.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.handleError = this.handleError.bind(this);
        this.getChanel = this.getChanel.bind(this)

    }

    componentDidMount() {
        let data = JSON.parse(localStorage.getItem('userData'))
        Chat.create(data.chatToken)
            .then(this.setupChatClient)
            .catch(this.handleError);
    }

    handleError(error) {
        console.error(error);
        this.setState({
            error: 'Не получилось загрузить чат.'
        });
    }

    setupChatClient(client) {
        this.client = client;
        // console.log(client)
        this.client.channels.getChannels()
            .then((channels) => channels.items)
            .then((user) => {
                // console.log(user)
                // user.forEach((item) => {
                //     item.getMembers().then((res) => {
                //         res.map((u) => {
                //             u.getUser().then((user) => {
                //                 console.log(user.friendlyName)
                //             })
                //         })
                //     })
                // })
                this.setState({users: user})
                this.setState({isLoading: false});
                // let a = user[0]?.getUserDescriptors().then((user)=>console.log(user))
            })

        // this.client.getChannelBySid('general2').then((res)=>console.log(res))

    }

    getChanel(client, sid, index) {
        this.client = client;
        let a = this.state.users[index]
        this.client
            .getChannelByUniqueName(sid)
            .then(channel => {
                channel.getMembers().then((res) => {
                    res.map((u) => {
                        u.getUser().then((user) => {
                            if(user.identity !== '1:[ADMIN]'){
                                this.setState({
                                    user: {name: user.friendlyName, id: sid}
                                })
                            }
                        })
                    })
                })
                return channel
            })
            // .catch(error => {
            //     if (error.body.code === 50300) {
            //         return this.client.createChannel({uniqueName: 'general2'});
            //     } else {
            //         this.handleError(error);
            //     }
            // })
            .then(channel => {
                this.channel = channel;
                return this.channel.join().catch(() => {
                });
            })
            .then(() => {
                this.channel.getMessages().then(this.messagesLoaded);
                this.channel.on('messageAdded', this.messageAdded);
            })
            .catch(this.handleError);
    }

    onUser(i, index) {
        this.getChanel(this.client, i, index)
    }

    twilioMessageToKendoMessage(message) {
        // console.log(message)
        return {
            text: message.body,
            author: {id: message.author, name: message.author},
            timestamp: message.timestamp,
            media: message.media
        };
    }

    messagesLoaded(messagePage) {
        console.log(messagePage)
        this.setState({
            messages: messagePage.items.map(this.twilioMessageToKendoMessage)
        });
    }

    messageAdded(message) {
        this.setState(prevState => ({
            messages: [
                ...prevState.messages,
                this.twilioMessageToKendoMessage(message)
            ]
        }));
    }

    sendMessage(text) {
        console.log(this.channel)
        if(typeof text === 'string'){
            this.channel.sendMessage(text)
        }else {
            this.channel.sendMessage({
                contentType: 'image/png',
                media: text
            });
        }
        this.setState({message: ''})
    }

    componentWillUnmount() {
        this.client.shutdown();
    }

    render() {
        // console.log(this.state.messages)
        if (this.state.error) {
            return <p>{this.state.error}</p>;
        } else if (this.state.isLoading) {
            return <Preloader/>
        }
        return (
            <ChatUI
                onSubmit={this.sendMessage.bind(this)}
                users={this.state.users}
                messages={this.state.messages}
                onUserChoose={this.onUser.bind(this)}
                user={this.state.user}
            />
        );
    }
}

export default ChatApp;