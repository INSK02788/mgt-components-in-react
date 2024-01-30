import './App.css';
import { Agenda, Login, PeoplePicker } from '@microsoft/mgt-react';
import { useIsSignedInGraph } from './graph';
import { LocalizationHelper } from '@microsoft/mgt-element';

//Comment below code to run this sample
LocalizationHelper.strings = { 
    _components: {
        "people-picker": {
            maxSelectionsPlaceHolder: ""
        }
    }
}

function App() {
    const [isSignedIn] = useIsSignedInGraph();



    type TUser = {
        email: string;
        password: string;
    };
    
    const user: Record<string, TUser> = {
        "3xamp1eUSERIdSTOR3DinAdb": {
            email: "example@example.com",
            password: "12345678",
        }
    };

  return (
      <div className="app">
          <header>
              <Login />
          </header>
          <div className="row">
              <div className="column">
                  {isSignedIn &&
                      <PeoplePicker selectionMode="single" />
                  }
              </div>
          </div>
          <div className="row">
              <div className="column">
                  {isSignedIn &&
                      <Agenda />}
              </div>
          </div>
      </div>
  );
}

export default App;
