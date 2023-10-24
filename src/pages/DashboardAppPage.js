import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
  useGetUserStatisticsQuery,
  useGetLikesStatisticsQuery,
  useGenderDistributionQuery,
  useGetUsersByMonthQuery,
  useActiveUsersStatsQuery,
} from '../redux/dashboard/dashboardApi';
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const { data: usersData, isFetching, isError } = useGetUserStatisticsQuery();
  const { data: likeData, isFetching: fetchingLikesStats, error } = useGetLikesStatisticsQuery();
  const { data: activeUsers, isFetching: fetchingActiveUsers, isError1 } = useActiveUsersStatsQuery();
  const { data: totalGenderDistribution } = useGenderDistributionQuery();
  const { data: usersByMonth, isFetching: fetchingUsersByMonth } = useGetUsersByMonthQuery();

  const totalUsers = usersData?.data?.totalUsers || 0;
  const maleUsers = usersData?.data?.maleUsers || 0;
  const femaleUsers = usersData?.data?.femaleUsers || 0;
  const newUsers = usersData?.data?.newUsers || 0;

  const totalFemales = totalGenderDistribution?.total?.totalFemales || 0;
  const totalMales = totalGenderDistribution?.total?.totalMales || 0;
  const dailyActiveMales = totalGenderDistribution?.totalDailyActive?.males || 0;
  const dailyActiveFemales = totalGenderDistribution?.totalDailyActive?.females || 0;
  const monthlyActiveMales = totalGenderDistribution?.totalMonthlyActive?.males || 0;
  const monthlyActiveFemales = totalGenderDistribution?.totalMonthlyActive?.females || 0;

  const [totalCount, setTotalCount] = useState(0);
  const [averageDailyLikes, setAverageDailyLikes] = useState(0);
  const [averageMonthlyLikes, setAverageMonthlyLikes] = useState(0);
  const [averageDailyLikesMale, setAverageDailyLikesMale] = useState(0);
  const [averageDailyLikesFemale, setAverageDailyLikesFemale] = useState(0);
  const [averageMonthlyLikesMale, setAverageMonthlyLikesMale] = useState(0);
  const [averageMonthlyLikesFemale, setAverageMonthlyLikesFemale] = useState(0);
  const [usersMonthly, setUsersMonthly] = useState();
  const [likesData, setLikesData] = useState([]);
  const [activeUsersData, setActiveUsersData] = useState([]);

  const [averageDailyUsers, setAverageDailyUsers] = useState(0);
  const [averageMonthlyUsers, setAverageMonthlyUsers] = useState(0);

  useEffect(() => {
    setActiveUsersData(activeUsers);
  }, [activeUsers]);

  useEffect(() => {
    setLikesData(likeData);
  }, [likeData]);

  useEffect(() => {
    setUsersMonthly(usersByMonth);
  }, [usersByMonth]);

  const likesPerMonth = likesData?.data?.likesPerMonth || 0;
  const likesPerDay = likesData?.data?.likesPerDay || 0;
  const likesPerDayMale = likesData?.data?.likesPerDayMale || 0;
  const likesPerDayFemale = likesData?.data?.likesPerDayFemale || 0;
  const likesPerMonthFemale = likesData?.data?.likesPerMonthFemale || 0;
  const likesPerMonthMale = likesData?.data?.likesPerMonthMale || 0;

  const totalActiveUsers = activeUsersData?.data?.totalActiveUsers || 0;
  const dailyActiveUsers = activeUsersData?.data?.activeUsersPerDay || 0;
  const monthlyActiveUsers = activeUsersData?.data?.activeUsersPerMonth || 0;
  console.log('users:', activeUsers);
  useEffect(() => {
    if (dailyActiveUsers) {
      let total = 0;
      Object.keys(dailyActiveUsers).forEach((key) => {
        total += dailyActiveUsers[key].count || 0;
      });
      const average = total / Object.keys(dailyActiveUsers).length;
      setTotalCount(total);
      setAverageDailyUsers(average);
    }

    if (monthlyActiveUsers) {
      let total = 0;
      Object.keys(monthlyActiveUsers).forEach((key) => {
        total += monthlyActiveUsers[key].count || 0;
      });
      const average = total / Object.keys(monthlyActiveUsers).length;
      setTotalCount(total);
      setAverageMonthlyUsers(average);
    }
  }, [dailyActiveUsers, monthlyActiveUsers]);

  useEffect(() => {
    if (likesPerMonthFemale) {
      let total = 0;
      Object.keys(likesPerMonthFemale).forEach((key) => {
        total += likesPerMonthFemale[key].count || 0;
      });
      const average = total / Object.keys(likesPerMonthFemale).length;
      setTotalCount(total);
      setAverageMonthlyLikesFemale(average);
    }
    if (likesPerMonthMale) {
      let total = 0;
      Object.keys(likesPerMonthMale).forEach((key) => {
        total += likesPerMonthMale[key].count || 0;
      });
      const average = total / Object.keys(likesPerMonthMale).length;
      setTotalCount(total);
      setAverageMonthlyLikesMale(average);
    }
    if (likesPerDayMale) {
      let total = 0;
      Object.keys(likesPerDayMale).forEach((key) => {
        total += likesPerDayMale[key].count || 0;
      });
      const average = total / Object.keys(likesPerDayMale).length;
      setTotalCount(total);
      setAverageDailyLikesMale(average);
    }
    if (likesPerDayFemale) {
      let total = 0;
      Object.keys(likesPerDayFemale).forEach((key) => {
        total += likesPerDayFemale[key].count || 0;
      });
      const average = total / Object.keys(likesPerDayFemale).length;
      setTotalCount(total);
      setAverageDailyLikesFemale(average);
    }
    if (likesPerDay) {
      let total = 0;
      Object.keys(likesPerDay).forEach((key) => {
        total += likesPerDay[key].count || 0;
      });
      const average = total / Object.keys(likesPerDay).length;
      setTotalCount(total);
      setAverageDailyLikes(average);
    }
    if (likesPerMonth) {
      let total = 0;
      Object.keys(likesPerMonth).forEach((key) => {
        total += likesPerMonth[key].count || 0;
      });
      const average = total / Object.keys(likesPerMonth).length;
      setTotalCount(total);
      setAverageMonthlyLikes(average);
    }
  }, [likesPerMonthFemale, likesPerMonthMale, likesPerDayMale, likesPerDayFemale, likesPerDay, likesPerMonth]);

  console.log("MONTHLY USERS =====", usersMonthly)
  let chartLabels = '0';
  let chartData = '0';
  if (usersMonthly) {
    chartLabels = Object.keys(usersMonthly);
    chartData = Object.values(usersMonthly);
  }

  let latest7Dates = [];
  let dailyChartsLabels = [];
  let dailyChartsData = [];

  let latest7Months = [];
  let monthlyChartsLabels = [];
  let monthlyChartsData = [];

  let latest7DatesActive = [];
  let dailyActiveChartsLabels = [];
  let dailyActiveChartsData = [];

  let latest7MonthsActive = [];
  let monthlyActiveChartsLabels = [];
  let monthlyActiveChartsData = [];

  if (monthlyActiveUsers) {
    latest7MonthsActive = monthlyActiveUsers
      .filter((item) => item._id)
      .sort((a, b) => new Date(b._id) - new Date(a._id))
      .slice(0, 7);

    monthlyActiveChartsLabels = latest7MonthsActive.map((item) => {
      const date = new Date(item._id);
      const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date
        .getDate()
        .toString()
        .padStart(2, '0')}/${date.getFullYear()}`;
      return formattedDate;
    });

    monthlyActiveChartsData = latest7MonthsActive.map((item) => item.count);
    // dailyChartsData.push(0);
  }

  if (dailyActiveUsers) {
    latest7DatesActive = dailyActiveUsers
      .filter((item) => item._id)
      .sort((a, b) => new Date(b._id) - new Date(a._id))
      .slice(0, 7);

    dailyActiveChartsLabels = latest7DatesActive.map((item) => {
      const date = new Date(item._id);
      const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date
        .getDate()
        .toString()
        .padStart(2, '0')}/${date.getFullYear()}`;
      return formattedDate;
    });

    dailyActiveChartsData = latest7DatesActive.map((item) => item.count);
    // dailyChartsData.push(0);
  }

  if (likesPerDay) {
    latest7Dates = likesPerDay
      .filter((item) => item._id)
      .sort((a, b) => new Date(b._id) - new Date(a._id))
      .slice(0, 7);

    dailyChartsLabels = latest7Dates.map((item) => {
      const date = new Date(item._id);
      const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date
        .getDate()
        .toString()
        .padStart(2, '0')}/${date.getFullYear()}`;
      return formattedDate;
    });

    dailyChartsData = latest7Dates.map((item) => item.count);
    // dailyChartsData.push(0);
  }

  if (likesPerMonth) {
    latest7Months = likesPerMonth
      .filter((item) => item._id)
      .sort((a, b) => new Date(b._id) - new Date(a._id))
      .slice(0, 7);

    monthlyChartsLabels = latest7Months.map((item) => {
      const date = new Date(item._id);
      const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date
        .getDate()
        .toString()
        .padStart(2, '0')}/${date.getFullYear()}`;
      return formattedDate;
    });

    monthlyChartsData = latest7Months.map((item) => item.count);
    // dailyChartsData.push(0);
  }
  if (isFetching && fetchingLikesStats && fetchingActiveUsers) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <Helmet>
        <title> Dashboard | Wendi UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={4}>
          <Typography variant="h6" sx={{ margin: '30px 0px 20px 40px' }}>
            1. User Statistics:
          </Typography>
          <Grid container spacing={3} justifyContent="space-around">
            <Grid item xs={12} sm={6} md={3} sx={{ m: 0, pd: 0 }}>
              <AppWidgetSummary
                title="Total number of registered users"
                total={totalUsers}
                icon={'ant-design:android-filled'}
                sx={{ minHeight: '260px', padding: '40px 10px' }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Total Active Users"
                total={totalActiveUsers}
                color="info"
                icon={'ant-design:heart-filled'}
                sx={{ minHeight: '260px', padding: '40px 10px' }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="new user sign-ups within a specified time period"
                total={newUsers}
                color="warning"
                icon={'ant-design:windows-filled'}
                sx={{ minHeight: '260px', padding: '40px 10px' }}
              />
            </Grid>

            {/* <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid> */}
          </Grid>
          {usersMonthly && (
            <Grid item xs={12} md={6} lg={8}>
              <AppWebsiteVisits
                title="User Statistics:"
                chartLabels={chartLabels}
                chartData={[
                  {
                    name: 'User Engagement',
                    type: 'area',
                    fill: 'gradient',
                    data: chartData,
                  },
                ]}
              />
            </Grid>
          )}

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="User Statistics:"
              chartData={[
                { label: 'Male', value: totalMales },
                { label: 'Female', value: totalFemales },
                // { label: 'Europe', value: 1443 },
                // { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.error.main,
                theme.palette.warning.main,
                theme.palette.info.main,
              ]}
            />
          </Grid>

          <Typography variant="h6" sx={{ margin: '30px 0px 20px 40px' }}>
            2. Daily Likes:
          </Typography>
          <Grid container spacing={3} justifyContent="space-around">
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Number of likes given by users on a daily basis"
                total={Math.round(averageDailyLikes)}
                icon={'ant-design:android-filled'}
                sx={{ minHeight: '260px', padding: '40px 10px' }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Number of likes given by male users"
                total={Math.round(averageDailyLikesMale)}
                color="info"
                icon={'ant-design:apple-filled'}
                sx={{ minHeight: '260px', padding: '40px 10px' }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Number of likes given by female users"
                total={Math.round(averageDailyLikesFemale)}
                color="warning"
                icon={'ant-design:windows-filled'}
                sx={{ minHeight: '260px', padding: '40px 10px' }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Daily Likes:"
              chartLabels={dailyChartsLabels}
              chartData={[
                {
                  name: 'Likes',
                  type: 'area',
                  fill: 'gradient',
                  data: dailyChartsData,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Daily Likes:"
              chartData={[
                { label: 'Male', value: averageDailyLikesMale },
                { label: 'Female', value: averageDailyLikesFemale },
                // { label: 'Europe', value: 1443 },
                // { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.error.main,
                theme.palette.warning.main,
                theme.palette.info.main,
              ]}
            />
          </Grid>

          <Typography variant="h6" sx={{ margin: '30px 0px 20px 40px' }}>
            3. Monthly Likes:
          </Typography>
          <Grid container spacing={3} justifyContent="space-around">
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Number of likes given by users on a monthly basis"
                total={Math.round(averageMonthlyLikes)}
                icon={'ant-design:android-filled'}
                sx={{ minHeight: '260px', padding: '40px 10px' }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Number of likes given by male users"
                total={Math.round(averageMonthlyLikesMale)}
                color="info"
                icon={'ant-design:apple-filled'}
                sx={{ minHeight: '260px', padding: '40px 10px' }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Number of likes given by female users"
                total={Math.round(averageMonthlyLikesFemale)}
                color="warning"
                icon={'ant-design:windows-filled'}
                sx={{ minHeight: '260px', padding: '40px 10px' }}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Monthly Likes:"
              chartLabels={monthlyChartsLabels}
              chartData={[
                {
                  name: 'Likes',
                  type: 'area',
                  fill: 'gradient',
                  data: monthlyChartsData,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Monthly Likes:"
              chartData={[
                { label: 'Male', value: averageMonthlyLikesMale },
                { label: 'Female', value: averageMonthlyLikesFemale },
                // { label: 'Europe', value: 1443 },
                // { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.error.main,
                theme.palette.warning.main,
                theme.palette.info.main,
              ]}
            />
          </Grid>

          <Typography variant="h6" sx={{ margin: '30px 0px 20px 40px' }}>
            4. Daily Active Users:
          </Typography>
          <Grid container spacing={3} justifyContent="space-around">
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Total number of active users on daily basis"
                total={Math.round(averageDailyUsers)}
                icon={'ant-design:android-filled'}
                sx={{ minHeight: '260px', padding: '40px 10px' }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="User retention"
                total={131}
                color="info"
                icon={'ant-design:apple-filled'}
                sx={{ minHeight: '260px', padding: '40px 10px' }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="User engagement"
                total={115}
                color="warning"
                icon={'ant-design:windows-filled'}
                sx={{ minHeight: '260px', padding: '40px 10px' }}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Daily Active Users"
              chartLabels={dailyActiveChartsLabels}
              chartData={[
                {
                  name: 'User Engagement',
                  type: 'area',
                  fill: 'gradient',
                  data: dailyActiveChartsData,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Gender Distribution"
              chartData={[
                { label: 'Male', value: dailyActiveMales },
                { label: 'Female', value: dailyActiveFemales },
                // { label: 'Europe', value: 1443 },
                // { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.error.main,
                theme.palette.warning.main,
                theme.palette.info.main,
              ]}
            />
          </Grid>

          <Typography variant="h6" sx={{ margin: '30px 0px 20px 40px' }}>
            5. Monthly Active Users:
          </Typography>
          <Grid container spacing={3} justifyContent="space-around">
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Total number of active users on monthly basis"
                total={Math.round(averageMonthlyUsers)}
                icon={'ant-design:android-filled'}
                sx={{ minHeight: '260px', padding: '40px 10px' }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="User retention"
                total={977}
                color="info"
                icon={'ant-design:apple-filled'}
                sx={{ minHeight: '260px', padding: '40px 10px' }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="User engagement"
                total={543}
                color="warning"
                icon={'ant-design:windows-filled'}
                sx={{ minHeight: '260px', padding: '40px 10px' }}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Monthly Active Users"
              chartLabels={monthlyActiveChartsLabels}
              chartData={[
                // {
                //   name: 'User Retention',
                //   type: 'column',
                //   fill: 'solid',
                //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                // },
                {
                  name: 'User Engagement',
                  type: 'area',
                  fill: 'gradient',
                  data: monthlyActiveChartsData,
                },
                // {
                //   name: 'Male',
                //   type: 'line',
                //   fill: 'solid',
                //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                // },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Gender Distribution"
              chartData={[
                { label: 'Male', value: monthlyActiveMales },
                { label: 'Female', value: monthlyActiveFemales },
                // { label: 'Europe', value: 1443 },
                // { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.error.main,
                theme.palette.warning.main,
                theme.palette.info.main,
              ]}
            />
          </Grid>

          <Typography variant="h6" sx={{ margin: '30px 0px 20px 40px' }}>
            6. Gender Distribution:
          </Typography>
          <Grid container spacing={3} justifyContent="space-around">
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Total number Male users"
                total={totalMales}
                icon={'ant-design:android-filled'}
                sx={{ minHeight: '260px', padding: '40px 10px' }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Total number of Female users"
                total={totalFemales}
                color="info"
                icon={'ant-design:apple-filled'}
                sx={{ minHeight: '260px', padding: '40px 10px' }}
              />
            </Grid>

            {/* <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="new user sign-ups within a specified time period"
                total={1}
                color="warning"
                icon={'ant-design:windows-filled'}
                sx={{ minHeight: '260px', padding: '40px 10px' }}
              />
            </Grid> */}
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Gender Distribution"
              // subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Male',
                  type: 'column',
                  fill: 'solid',
                  data: [totalMales],
                },
                {
                  name: 'Female',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Male',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
                {
                  name: 'Female',
                  type: 'column',
                  fill: 'solid',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Gender Distribution"
              chartData={[
                { label: 'Male', value: totalMales },
                { label: 'Female', value: totalFemales },
                // { label: 'Europe', value: 1443 },
                // { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.error.main,
                theme.palette.warning.main,
                theme.palette.info.main,
              ]}
            />
          </Grid>

          {/* <Typography variant="h6" sx={{ margin: '30px 0px 20px 40px' }}>
          7. Registration Statistics:
        </Typography>
        <Grid container spacing={3} justifyContent="space-around">
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total number of registered users" total={714000} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Active users currently using the app" total={1352831} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="new user sign-ups within a specified time period" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>
          </Grid>
           */}

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="     7. Registration Statistics:"
              // subheader="(+43%) than last year"
              chartData={[
                { label: 'January', value: 400 },
                { label: 'February', value: 430 },
                { label: 'March', value: 448 },
                { label: 'April', value: 470 },
                { label: 'May', value: 540 },
                { label: 'June', value: 580 },
                { label: 'July', value: 690 },
                { label: 'August', value: 1100 },
                { label: 'September', value: 1200 },
                { label: 'October', value: 1380 },
                { label: 'November', value: 880 },
                { label: 'December', value: 380 },
              ]}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
