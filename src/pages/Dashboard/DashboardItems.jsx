import React from 'react'
import { useContext } from 'react';
import UserContext from '../../context/userContext';
import QuizzesContext from '../../context/quizzesContext';

export const DashboardItems = () => {
    const { users } = useContext(UserContext);
    const {fetchedQuizzes, isRegularQuizzes, isDailyQuizzes, }=useContext(QuizzesContext)
  
    console.log(users);
    console.log(fetchedQuizzes);
    const quizzesLength = fetchedQuizzes.length
    const members = users.length

  
    const usersWithTotalScore = users.map((user) => {
      const userName = user.name;
      const totalScore = Array.isArray(user.quizResults)
        ? user.quizResults.reduce((sum, quiz) => sum + quiz.score, 0)
        : 0;
  
      return { userName, totalScore };
    });
  
    console.log(usersWithTotalScore, "Total score");
  

  return {quizzesLength, members}
}

