import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

class NewCampaign extends Component {
  state = {
    minimumContribution: "",
    errorMessage: "",
    loading: false
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    this.setState({loading: true,errorMessage: ''});
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
      .createCampaign(this.state.minimumContribution)
      .send({
        from: accounts[0],
      });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({loading: false});
  };

  render() {
    return (
      <Layout>
        <h3>Create a Campaign</h3>

        <Form onSubmit={this.handleSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="Wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={(event) =>
                this.setState({ minimumContribution: event.target.value })
              }
            />
            <Message error header="Oops" content={this.state.errorMessage} />
          </Form.Field>
          <Button loading={this.state.loading} primary>Create</Button>
        </Form>
      </Layout>
    );
  }
}

export default NewCampaign;
