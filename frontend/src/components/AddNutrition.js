import React, {setState, useState} from 'react'
import { Button, Header, Modal, Loader, Dimmer } from 'semantic-ui-react'
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';

import axios from 'axios'


export class AddNutrition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          modelOpen: false,
          formEnabled: true,
          foodSearchResults: [],
          foodSearchKeyword: '',
          userNutrition: this.props.userLog,
          loading: false
        };
        this.baseState = this.state 
       
    this.handleMealSearch = this.handleMealSearch.bind(this);
    this.getMealMacros = this.getMealMacros.bind(this);
    }


    handleMealSearch = (e) => {
        event.preventDefault();
        const data = new FormData(e.target);
        const query = data.get('foodSearchKeyword')
        this.setState({loading: true})
        axios.get(`/api/get_food_list/${query}/`)
        .then(response => {
            this.setState({foodSearchResults: response.data, 
                           loading: false});
        })
    };

    getMealMacros = (id) => {
        axios.get(`/api/get_food_detail/${id}/`)
        .then(response => {
            this.props.queueSelectedMealEntry(response.data);
            this.handleModalClose();
        })
        .catch(err => {
            toast({
                type: 'error',
                title: 'Error',
                description: 'Error retrieving selected food macros',
                time: 2000,
            });
        });
    };

    handleModalOpen = () => (
        this.setState({ modalOpen: true})
    );

    handleModalClose = () => (
        this.setState({ modalOpen: false })
    );

    render() {
        const foodSearchResults = (this.state.foodSearchResults.length ? (this.state.foodSearchResults.map(item => {
        return  <tr key={item.id}>
                <td onClick={() => this.getMealMacros(item.id)}><a>{item.meal_name}</a></td>
                <td>{item.serving}</td>
                <td>{item.calories}</td>
                </tr>})): <div><p>There are no results</p></div>)
        const preloader = (this.state.loading ?  <Dimmer active inverted>
                                                   <Loader inverted>Loading</Loader>
                                                 </Dimmer> : null)

        const mealSearchModal = <Modal trigger={<a
        onClick={this.handleModalOpen}>Search food database</a>}
        open={this.state.modalOpen}
        onClose={this.handleModalClose}>

        <Modal.Header>Food Search</Modal.Header>
        <Modal.Content scrolling>
        <Modal.Description>
            <Header>Search for food item or meal by name</Header>
                <form onSubmit={this.handleMealSearch}>
                    <div className="ui input">
                        <input type="text" name="foodSearchKeyword"
                        placeholder="Search..." />
                        <button className="tiny ui primary button">Search</button>
                    </div>
                </form>

                {preloader}

                {foodSearchResults.length > 0 && 
                <table className="ui very basic table">
                    <thead>
                    <tr>
                        <th>Meal</th>
                        <th>Serving Size</th>
                        <th>Calories</th>
                    </tr>
                    </thead>
                    <tbody>
                        {foodSearchResults}
                    </tbody>
                </table>}
        </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
        <Button onClick={this.handleModalClose}>
            Close
        </Button>
        </Modal.Actions>
        </Modal>

        return (
            <div className="ui container">
            {mealSearchModal}
            <div className="ui divider"></div>
            <form onSubmit={this.props.action}>
                <div className="ui form">
                    <div className="fields">
                        <div className="field">
                        <label>Meal</label>
                        <input type="text" name="meal_name"
                        value={this.props.meal_name} onChange={this.props.handleChange}
                        required/>
                        </div>
                        <div className="field">
                        <label>Servings</label>
                        <input type="text" name="servings"
                        value={this.props.servings} onChange={this.props.handleChange}
                        min="1" placeholder="Servings" step="any" required/>
                        </div>
                        <div className="field">
                        <label>Protein</label>
                        <input type="number" name="protein"
                        value={this.props.protein} onChange={this.props.handleChange}
                        min="0" placeholder="Protein" step="any" required/>
                        </div>
                        <div className="field">
                        <label>Carbohydrates</label>
                        <input type="number" name="carbohydrates"
                        value={this.props.carbohydrates} onChange={this.props.handleChange}
                        min="0" placeholder="Carbohydrates" step="any" required/>
                        </div>
                        <div className="field">
                        <label>Fats</label>
                        <input type="number" name="fat"
                        value={this.props.fat} onChange={this.props.handleChange}
                        min="0" placeholder="Fat" step="any" required/>
                        </div>
                        <div className="field">
                        <label>Calories</label>
                        <input type="number" name="calories"
                        value={this.props.calories} onChange={this.props.handleChange}
                        min="0" placeholder="Calories" step="any" required/>
                        </div>
                    </div>
                    <button className="ui primary button">Save Entry</button>
                </div>
            </form>
            <div className="ui divider"></div>
            </div>
        );
    }
}
