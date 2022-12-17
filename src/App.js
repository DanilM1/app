import { useSelector } from 'react-redux';

import Header from './components/header';
import Home from './pages/home';
import Contact from './pages/contact';
import Application from './pages/application';
import Administrative from './pages/administrative';
import Reports from './pages/reports';
import Footer from './components/footer';

export default function App() {
  const { active } = useSelector((state) => state.data);

  return (
    <div className='App'>
      <Header />
      {active === 'home' ? <Home /> : null}
      {active === 'contact' ? <Contact /> : null}
      {active === 'application' ? <Application /> : null}
      {active === 'administrative' ? <Administrative /> : null}
      {active === 'reports' ? <Reports /> : null}
      <Footer />
    </div>
  );
}