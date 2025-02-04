import { ImUsers } from "react-icons/im";
import { MdOutlineQuiz } from "react-icons/md";
import { GiPodiumWinner } from "react-icons/gi";
import { useContext } from "react";
import QuizzesContext from "../../context/quizzesContext";
import UserContext from "../../context/userContext";


export const GridItemData = () => {
  const { users } = useContext(UserContext);
  const { fetchedQuizzes, isRegularQuizzes, isDailyQuizzes } =
    useContext(QuizzesContext);
  const quizzesLength = fetchedQuizzes.length;
  const members = users.length;

  const item_data = [
    {
      key: "1",
      title: "Number of users",
      value: members,
      subtext: "Users",
      Icon: ImUsers,
      roundDivbgColor: "#6495ED",
      footerTitil_1: "RQU",
      footerTitil_2: "DQU",
      countRegularQuiz: isRegularQuizzes.length,
      countDailyQuiz: isDailyQuizzes.length,
      titleContainerClass: "grid-title-container-1",
      footerItems: [
        {
          title: "RQU",
          count: isRegularQuizzes.length,
          textColor: "darkgreen",
          spanColor: "black",
          route: "#/winners-regular",
        },
        {
          title: "DQU",
          count: isDailyQuizzes.length,
          textColor: "purple",
          spanColor: "orange",
          route: "#/winners-daily",
        },
      ]
    },
    {
      key: "2",
      title: "Total Winners",
      value: 30,
      subtext: "Winners",
      Icon: GiPodiumWinner,
      roundDivbgColor: "tomato",
      footerTitil_1: "RQW",
      footerTitil_2: "DQW",
      countRegularQuiz: isRegularQuizzes.length,
      countDailyQuiz: isDailyQuizzes.length,
      titleContainerClass: "grid-title-container-2",
      footerItems: [
        {
          title: "RQW",
          count: isRegularQuizzes.length,
          textColor: "red",
          spanColor: "black",
          route: "/show-regular-quizzes-winners",
        },
        {
          title: "DQW",
          count: isDailyQuizzes.length,
          textColor: "indigo",
          spanColor: "mediumvioletred",
          route: "/show-daily-quizzes-winners",
        },
      ],
    },
    {
      key: "3",
      title: "Quizzes",
      value: quizzesLength,
      subtext: "Quizzes",
      Icon: MdOutlineQuiz,
      roundDivbgColor: "#8e44ad",
      footerTitil_1: "Regular Quizzes",
      footerTitil_2: "Daily Quizzes",
      countRegularQuiz: isRegularQuizzes.length,
      countDailyQuiz: isDailyQuizzes.length,
      titleContainerClass: "grid-title-container-3",
      footerItems: [
        {
          title: "Regular Quizzes",
          count: isRegularQuizzes.length,
          textColor: "red",
          spanColor: "black",
          route: "/show-regular-quizzes",
        },
        {
          title: "Daily Quizzes",
          count: isDailyQuizzes.length,
          textColor: "indigo",
          spanColor: "mediumvioletred",
          route: "/show-daily-quizzes",
        },
      ],
    },
  ];

  
  return { item_data };
};
