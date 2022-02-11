import React from 'react';
import CreateEventButton from './CreateEventButton';
import SmallCalendar from './SmallCalendar';
import './Sidebar.css';

export default function SideBar() {
  return (
    <aside className="sidebar">
      <CreateEventButton />
      <SmallCalendar />
    </aside>
  );
}
