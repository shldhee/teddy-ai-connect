import MainLayout from './components/layout/MainLayout';
import Dashboard from './components/dashboard/Dashboard';
import ChatBox from './components/ChatBox';

function App() {
  return (
    <>
      <MainLayout>
        <Dashboard />
      </MainLayout>
      <ChatBox />
    </>
  );
}

export default App;
