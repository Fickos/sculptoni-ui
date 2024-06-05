import { useState } from 'react';
import GeneralFormTab from './GeneralFormTab';
import PropsFormTab from './PropsFormTab';
import StatesFormTab from './StatesFormTab';
import ActionsFormTab from './ActionsFormTab';
import RenderFormTab from './RenderFormTab';
import ImportsFormTab from './ImportsFormTab';
import EffectsFormTab from './EffectsFormTab';
import { useSelector } from 'react-redux';
import { workspaceSliceSelectors } from '../../../../redux/workspaceSlice';

const componentTabs = Object.freeze([
  'General',
  'Props',
  'States',
  'Effects',
  'Actions',
  'Render',
  'Imports',
]);

export default function ComponentTabs() {
  const selectedElement = useSelector(workspaceSliceSelectors.selectedElement);

  const [activeTab, setActiveTab] = useState(componentTabs[0]);

  return (
    <>
      <div className="tabs">
        {componentTabs.map((tab) => (
          <button
            className={`tab ${activeTab === tab ? 'active' : 'inactive'} ${
              selectedElement.type
            }`}
            key={`tab-${tab}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {activeTab === 'General' && <GeneralFormTab />}
        {activeTab === 'Props' && <PropsFormTab />}
        {activeTab === 'States' && <StatesFormTab />}
        {activeTab === 'Effects' && <EffectsFormTab />}
        {activeTab === 'Actions' && <ActionsFormTab />}
        {activeTab === 'Render' && <RenderFormTab />}
        {activeTab === 'Imports' && <ImportsFormTab />}
      </div>
    </>
  );
}
