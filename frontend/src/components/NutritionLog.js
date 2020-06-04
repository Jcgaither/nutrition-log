import React, { Component } from 'react'
import axios from 'axios'
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';

import { AddNutrition } from './AddNutrition'
import { DatePicker } from './DatePicker'

export class NutritionLog extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedDate: new Date(),
            totalProtein: 0,
            totalCarbs: 0,
            totalFat: 0,
            totalCalories:0,
            meal_name: '',
            servings: 1,
            protein: 0,
            carbohydrates: 0,
            fat: 0,
            calories: 0,
            userNutrition: [],
            isLoading: false,
        }
    this.handleChange = this.handleChange.bind(this);
    this.handleEntrySubmission = this.handleEntrySubmission.bind(this);
    this.handleEntryDelete = this.handleEntryDelete.bind(this);
    this.getUserNutritionLog = this.getUserNutritionLog.bind(this);
    }

    componentDidMount = () => {
        this.getUserNutritionLog(this.state.selectedDate);
    }

    getUserNutritionLog = (date) => {
        this.setState({selectedDate: date});
        let js_timestamp = date.getTime() / 1000;
        axios.get('/api/nutrition/', {
            params: {
              date: js_timestamp
            }
          })
        .then(response => {
            const userNutrition = response.data;
            this.setState({userNutrition}, () => this.calculateDailyTotal());
        })
        .catch(error => {
            toast({
                type: 'error',
                title: 'Error',
                description: 'Error retrieving nutrition log entry, please try again later',
                time: 2000,
            });
        }) 
    }

    handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
    };

    handleEntryDelete = (entry, index) => {
        axios.delete(`/api/nutrition/${entry.id}/`)
        .then(response => {
            this.setState({
                userNutrition: this.state.userNutrition.filter((_, i) => i !== index)
            });
            toast({
                type: 'success',
                title: 'Delete successful',
                description: 'Entry successfully deleted',
                time: 2000,
            });
        })
        .then(() => {
            this.calculateDailyTotal()
        })
        .catch(error => {
            toast({
                type: 'error',
                title: 'Error',
                description: 'Error deleting nutrition log entry, please try again',
                time: 2000,
            });
        });
    }
    
    handleEntrySubmission = (e) => {
        e.preventDefault();
        const { userNutrition } = this.state;
        let object = {};
        const data = new FormData(e.target);
        data.forEach((value, key) => {object[key] = value});
        let date = this.state.selectedDate.getTime() / 1000;
        object['date'] = date;
        let json = JSON.stringify(object);
        axios.post('/api/nutrition/', {
            data:json
        })
          .then(response => {
              this.setState({userNutrition: userNutrition.concat(response.data)})
              toast({
                type: 'success',
                icon: null,
                title: 'Success',
                description: 'New entry saved',
                time: 2000,
            });
          })
          .then(() => {
            this.calculateDailyTotal()
            this.setState({meal_name: '',
                           servings: 1,
                           protein: 0,
                           carbohydrates: 0,
                           fat: 0,
                           calories: 0})
          })
          .catch(() => {
            toast({
                type: 'error',
                title: 'Error',
                description: 'Error creating new entry, please try again',
                time: 2000,
            });
          });
    }

    calculateDailyTotal = () => {
        console.log("doing this");
        let calorieTotal = 0;
        let proteinTotal = 0;
        let carbohydratesTotal = 0;
        let fatTotal = 0;
        this.state.userNutrition.forEach((entry) => {
            calorieTotal += Number(entry.calories);
            proteinTotal += Number(entry.protein);
            carbohydratesTotal += Number(entry.carbohydrates);
            fatTotal += Number(entry.fat);
        });
        this.setState({totalCalories:calorieTotal, totalCarbs:carbohydratesTotal,
                       totalFat:fatTotal, totalProtein:proteinTotal})
        console.log(this.state.userNutrition);
    }

    queueSelectedMealEntry = (response) => {
        for (let [key, value] of Object.entries(response)) {
                this.setState({[key]: value});
        }
    }


    render() {
        const userEntry = (this.state.userNutrition.map((entry, index) => 
                            <tr key={entry.id}>
                                <td>{index + 1}</td>
                                <td>{entry.meal_name}</td>
                                <td>{entry.servings}</td>
                                <td>{entry.protein}g</td>
                                <td>{entry.carbohydrates}g</td>
                                <td>{entry.fat}g</td>
                                <td>{entry.calories}</td>
                                <td className="center aligned">
                                    <button onClick ={() => this.handleEntryDelete(entry, index)} className="small ui red button">
                                        Delete
                                    </button>
                                </td>                             
                            </tr>
                                )
                            ) 

        const footerTotals = (this.state.userNutrition.length ?
                                    (<tr>
                                        <th>Total</th>
                                        <th></th>
                                        <th></th>
                                        <th>{this.state.totalProtein}g</th>
                                        <th>{this.state.totalCarbs}g</th>
                                        <th>{this.state.totalFat}g</th>
                                        <th>{this.state.totalCalories}</th>
                                        <th></th>
                                    </tr>) : null
                                    )  

        return (
            <div>
                <SemanticToastContainer />
                <div className="ui main container">
                    <h2>Nutrition Log</h2>
                    <AddNutrition action={this.handleEntrySubmission} userLog={this.state.userNutrition} handleChange={this.handleChange}
                                  meal_name={this.state.meal_name} servings={this.state.servings} protein={this.state.protein}
                                  carbohydrates={this.state.carbohydrates} fat={this.state.fat} calories={this.state.calories}
                                  showLoader={this.state.showLoader} queueSelectedMealEntry={this.queueSelectedMealEntry}/>       
                    <table className="ui celled stripe table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Meal</th>
                                <th>Servings</th>
                                <th>Protein</th>
                                <th>Carbohydrates</th>
                                <th>Fat</th>
                                <th>Calories</th>
                                <th></th>
                            </tr>
                        </thead>
                            <tbody>
                                {userEntry}
                            </tbody>
                            <tfoot>
                                {footerTotals}
                            </tfoot>
                    </table>
                    <DatePicker action={this.getUserNutritionLog} />
                </div>        
            </div>   
        )
    }
}
