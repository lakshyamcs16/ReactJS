import React from 'react';
import FSGrid from './Components/Grid/FSGrid';
import Tabs from './Components/Tabs/Tabs';
import glamorous from 'glamorous';

function App() {
  return (
    <div>
      <Tabs
        activeTab={{
          id: "tab1"
        }}>
        <React.Fragment>
            <Tabs.Tab id="tab1" title="Tab 1">
              <glamorous.Div padding={20}><FSGrid /></glamorous.Div>
            </Tabs.Tab>
            <Tabs.Tab id="tab2" title="Tab 2">
              <glamorous.Div padding={20}>This is tab 2</glamorous.Div>
            </Tabs.Tab>
        </React.Fragment>
      </Tabs>
        
    </div>
  );
}

export default App;
