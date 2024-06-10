import React from 'react'
import AddExpense from '../components/AddExpense';
import ExpenseList from '../components/ExpenseList';
import MonthSelect from '../components/MonthSelect';
import ExpenseSummary from '../components/ExpenseSummary';

const Home = () => {

    return (
        <>
            <AddExpense />
            <MonthSelect />
            <ExpenseSummary />
            <ExpenseList />
        </>
    )
}

export default Home