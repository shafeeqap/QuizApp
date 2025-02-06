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

  console.log(users, "Users");

  const totalScore = users.map((user) => {
    const { name: userName, quizResults = [] } = user;

    const winner = quizResults.map((result) => {
      const quizType = result.quizType;
      const score = result.score;
      const quizLength = result.quizDetails?.length || 0;
      return { score, quizLength, quizType };
    });

    return { userName, winner };
  });

  console.log(totalScore, "Total Score.............");

  // <=========== count of daily quiz and regular quiz winners =============>
  const result = totalScore.flatMap((user) => user.winner);
  const quizCounts = { RegularQuiz: 0, DailyQuiz: 0 };
  result.forEach((item) => {
    if (item.score === item.quizLength) {
      quizCounts[item.quizType] = (quizCounts[item.quizType] || 0) + 1;
    }
  });
  // <=========== count of daily quiz and regular quiz winners =============>

  const item_data = [
    {
      key: "1",
      title: "Number of users",
      subtext: "Users",
      Icon: ImUsers,
      value: users.length,
      roundDivbgColor: "#6495ED",
      path: "/show-quizzes",
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
      ],
    },
    {
      key: "2",
      title: "Total Winners",
      subtext: "Winners",
      Icon: GiPodiumWinner,
      value: quizCounts.RegularQuiz + quizCounts.DailyQuiz,
      roundDivbgColor: "tomato",
      path: "/show-quizzes",
      titleContainerClass: "grid-title-container-2",
      footerItems: [
        {
          title: "RQW",
          count: quizCounts.RegularQuiz,
          textColor: "red",
          spanColor: "black",
          route: "#/show-regular-quizzes-winners",
        },
        {
          title: "DQW",
          count: quizCounts.DailyQuiz,
          textColor: "indigo",
          spanColor: "mediumvioletred",
          route: "#/show-daily-quizzes-winners",
        },
      ],
    },
    {
      key: "3",
      title: "Quizzes",
      subtext: "Quizzes",
      Icon: MdOutlineQuiz,
      value: quizzesLength,
      roundDivbgColor: "#8e44ad",
      path: "/show-quizzes",
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
