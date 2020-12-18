import React, { Component } from 'react';
import DatabaseService from 'services/DatabaseService';
import { Button, InputText, RadioGroup, Notification, Media } from "@kiwiwealth/ui";
import DisplayFileList from 'components/displayFileList/DisplayFileList';

const initialState = { customer: undefined, processedCustomer: [], notification: false, memberId: "", customerArray: [], documentItemsArray: [] };
export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.searchOnclick = this.searchOnclick.bind(this);
        this.withdrawalOnclick = this.withdrawalOnclick.bind(this);
        this.documentItemsArraySearch = this.documentItemsArraySearch.bind(this);
        this.state = initialState;
    }
    withdrawalOnclick() {
        const { memberId } = this.state;
        DatabaseService.createDocumentRequest({ status: 'pending', memberId, storageFileLink: "" });
        //TODO only do it on success
        let processedCustomer = this.state.processedCustomer;
        processedCustomer.push(this.state.customer);
        this.setState({ processedCustomer, notification: true });
        setTimeout
            (
                () => {
                    this.setState({ notification: false });
                },
                3000
            )
    }
    searchOnclick() {
        //TODO filter search by text
        const { memberId } = this.state;
        DatabaseService.getCustomers().on
            (
                "value",
                (items) => {
                    var customerArray = [];
                    items.forEach
                        (
                            item => {
                                let value = item.val();

                                try {
                                    if (value.memberId.toString().indexOf(memberId) >= 0) {
                                        customerArray.push(value.name + " - " + value.memberId);
                                    }
                                }
                                catch { }

                            }
                        );
                    customerArray = Array.from(new Set(customerArray)).map(customer => ({ label: customer, value: customer, id: customer }));
                    this.setState({ customerArray });
                }
            );
    }
    documentItemsArraySearch() {
        DatabaseService.getAll().on
            (
                "value",
                (items) => {
                    var documentItemsArray = [];
                    items.forEach
                        (
                            item => {
                                let value = item.val();
                                if (value.memberId === this.state.customer) {
                                    documentItemsArray.push({ key: item.key, info: item.val() });
                                }
                            }
                        );
                    this.setState({ documentItemsArray });
                }
            );
    }

    render() {
        var { memberId, customer } = this.state;
        var customerList = this.state.customerArray.length ?
            <div>
                <RadioGroup vertical options={this.state.customerArray} id="customers" label="Customers" onChange={(event) => this.setState({ customer: event.target.value })} />
                <br />
            </div> : undefined;

        var submitButton = this.state.customer ? <Button disabled={this.state.processedCustomer.includes(customer)} onClick={this.withdrawalOnclick}>Share the most secure drive in the whole world wide web</Button> : undefined;
        return (
            <>
                <h1>Kiwi Wealth DocSpace - Admin page</h1>
                <div style={{ alignContent: "center" }} className="u-margin-bottom">
                    <InputText label="MemberId" id="memberId" value={memberId} onChange={(event) => this.setState({ memberId: event.target.value })} />
                    <Button onClick={this.searchOnclick}>Search</Button>
                </div>
                {customerList}
                <Notification type="success" isActive={this.state.notification}>
                    <Media noWrap wrapBody={false}>
                        <h3>Well done, member folder is created</h3>
                        <p>An drive folder for this customer was created</p>
                        <p>An email has been sent to the customer</p>
                    </Media>
                </Notification>
                {submitButton}
                { customer && <DisplayFileList memberId={memberId} />}

            </>
        );
    }
}