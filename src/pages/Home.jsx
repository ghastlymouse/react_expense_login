import React from 'react'
import AddExpense from '../components/main/AddExpense';
import ExpenseList from '../components/main/ExpenseList';
import MonthSelect from '../components/main/MonthSelect';
import ExpenseSummary from '../components/main/ExpenseSummary';

const Home = () => {

    return (
        <>
            <AddExpense />
            <MonthSelect />
            {/* <ExpenseSummary /> */}
            <ExpenseList />
        </>
    )
}

export default Home