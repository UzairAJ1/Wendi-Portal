import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
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
import { useGetUserStatisticsQuery, useGetLikesStatisticsQuery } from '../redux/dashboard/dashboardApi';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const { data: userData, isFetching } = useGetUserStatisticsQuery();
  const { data: likesData, isFetching: fetchingData } = useGetLikesStatisticsQuery();

  console.log('====', userData);
  console.log('====', likesData);

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
                total={100}
                icon={'ant-design:android-filled'}
                sx={{ minHeight: '260px', padding: '40px 10px' }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Active users currently using the app"
                total={831}
                color="info"
                icon={'ant-design:heart-filled'}
                sx={{ minHeight: '260px', padding: '40px 10px' }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="new user sign-ups within a specified time period"
                total={315}
                color="warning"
                icon={'ant-design:windows-filled'}
                sx={{ minHeight: '260px', padding: '40px 10px' }}
              />
            </Grid>

            {/* <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid> */}
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="User Statistics:"
              subheader="(+43%) than last year"
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
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                // {
                //   name: 'Male',
                //   type: 'line',
                //   fill: 'solid',
                //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                // },
                {
                  name: 'User Retention',
                  type: 'column',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="User Statistics:"
              chartData={[
                { label: 'Male', value: 4344 },
                { label: 'Female', value: 5435 },
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
                total={240}
                icon={'ant-design:android-filled'}
                sx={{ minHeight: '260px', padding: '40px 10px' }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Number of likes given by male users"
                total={131}
                color="info"
                icon={'ant-design:apple-filled'}
                sx={{ minHeight: '260px', padding: '40px 10px' }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Number of likes given by female users"
                total={119}
                color="warning"
                icon={'ant-design:windows-filled'}
                sx={{ minHeight: '260px', padding: '40px 10px' }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Daily Likes:"
              subheader="(+43%) than last year"
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
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                // {
                //   name: 'Male',
                //   type: 'line',
                //   fill: 'solid',
                //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                // },
                {
                  name: 'User Retention',
                  type: 'column',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Daily Likes:"
              chartData={[
                { label: 'Male', value: 4344 },
                { label: 'Female', value: 5435 },
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
                total={710}
                icon={'ant-design:android-filled'}
                sx={{ minHeight: '260px', padding: '40px 10px' }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Number of likes given by male users"
                total={131}
                color="info"
                icon={'ant-design:apple-filled'}
                sx={{ minHeight: '260px', padding: '40px 10px' }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Number of likes given by female users"
                total={119}
                color="warning"
                icon={'ant-design:windows-filled'}
                sx={{ minHeight: '260px', padding: '40px 10px' }}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Monthly Likes:"
              subheader="(+43%) than last year"
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
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                // {
                //   name: 'Male',
                //   type: 'line',
                //   fill: 'solid',
                //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                // },
                {
                  name: 'User Retention',
                  type: 'column',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Monthly Likes:"
              chartData={[
                { label: 'Male', value: 4344 },
                { label: 'Female', value: 5435 },
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
                total={710}
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
              subheader="(+43%) than last year"
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
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                // {
                //   name: 'Male',
                //   type: 'line',
                //   fill: 'solid',
                //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                // },
                {
                  name: 'User Retention',
                  type: 'column',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Gender Distribution"
              chartData={[
                { label: 'Male', value: 4344 },
                { label: 'Female', value: 5435 },
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
                total={576}
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
              subheader="(+43%) than last year"
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
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                // {
                //   name: 'Male',
                //   type: 'line',
                //   fill: 'solid',
                //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                // },
                {
                  name: 'User Retention',
                  type: 'column',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Gender Distribution"
              chartData={[
                { label: 'Male', value: 4344 },
                { label: 'Female', value: 5435 },
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
                title="Total number of registered users"
                total={700}
                icon={'ant-design:android-filled'}
                sx={{ minHeight: '260px', padding: '40px 10px' }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Active users currently using the app"
                total={831}
                color="info"
                icon={'ant-design:apple-filled'}
                sx={{ minHeight: '260px', padding: '40px 10px' }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="new user sign-ups within a specified time period"
                total={315}
                color="warning"
                icon={'ant-design:windows-filled'}
                sx={{ minHeight: '260px', padding: '40px 10px' }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Gender Distribution"
              subheader="(+43%) than last year"
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
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
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
                { label: 'Male', value: 4344 },
                { label: 'Female', value: 5435 },
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
              subheader="(+43%) than last year"
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
