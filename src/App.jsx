
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFoundPage';
import JobPage, {jobLoader} from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';

import { Client } from '@neondatabase/serverless';

const postgresqlUrl = "postgresql://neondb_owner:npg_ZArCK45fbUst@ep-round-cell-a15m0uka-pooler.ap-southeast-1.aws.neon.tech/job-post-db?sslmode=require&channel_binding=require";

const App = () => {
  // Add New Job
  const addJob = async (newJob) => {
    const neonClient = new Client({ connectionString: postgresqlUrl });
    try {
      await neonClient.connect();
      await neonClient.query(
        `INSERT INTO jobpostdb (title, type, location, description, salary, company_name, company_description, contact_email, contact_phone, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())`,
        [
          newJob.title,
          newJob.type,
          newJob.location,
          newJob.description,
          newJob.salary,
          newJob.company_name,
          newJob.company_description,
          newJob.contact_email,
          newJob.contact_phone
        ]
      );
    } catch (error) {
      console.error('Error adding job:', error);
    } finally {
      await neonClient.end();
    }
    return;
  };

// Delete Job
  const deleteJob = async (id) => {
    const neonClient = new Client({ connectionString: postgresqlUrl });
    try {
      await neonClient.connect();
      await neonClient.query(
        `DELETE FROM jobpostdb WHERE id = $1`,
        [id]
      );
    } catch (error) {
      console.error('Error deleting job:', error);
    } finally {
      await neonClient.end();
    }
    return;
  };

  // Update Job
  const updateJob = async (job) => {
    const neonClient = new Client({ connectionString: postgresqlUrl });
    try {
      await neonClient.connect();
      await neonClient.query(
        `UPDATE jobpostdb SET title = $1, type = $2, location = $3, description = $4, salary = $5, company_name = $6, company_description = $7, contact_email = $8, contact_phone = $9 WHERE id = $10`,
        [
          job.title,
          job.type,
          job.location,
          job.description,
          job.salary,
          job.company_name,
          job.company_description,
          job.contact_email,
          job.contact_phone,
          job.id
        ]
      );
    } catch (error) {
      console.error('Error updating job:', error);
    } finally {
      await neonClient.end();
    }
    return;
  };


const route = createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' element={<MainLayout />}>
  <Route index element = {<HomePage />}/>
  <Route path='/jobs' element ={<JobsPage />}/>
  <Route path='/add-job' element ={<AddJobPage addJobSubmit={addJob} />}/>
  <Route path='/edit-job/:id' element ={<EditJobPage updateJobSubmit={updateJob}/>} loader= {jobLoader}/>
  <Route path='/jobs/:id' element ={<JobPage deleteJob ={ deleteJob }/>} loader= {jobLoader}/>
  <Route path='*' element ={<NotFoundPage />}/>
  </Route>
  )
);
  return <RouterProvider router = {route} />
  
};

export default App;