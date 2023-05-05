import AppBootstrap from './src/components/appBootstrap/appBootstrap';
import Navigator from './src/config/navigator';
import { AuthProvider } from './src/contexts/authContext';

export default function App() {
  return (
    <AuthProvider>
      <AppBootstrap>
        <Navigator />
      </AppBootstrap>
    </AuthProvider>
  );
}
