export function SidebarStyles() {
  return (
    <style>{`
      .sidebar {
        width: 250px;
        height: 100%;
        border-right: 1px solid var(--border-color);
        display: flex;
        flex-direction: column;
      }
      .sidebar-content {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
      }
      .sidebar-footer {
        padding: 1rem;
        border-top: 1px solid var(--border-color);
        display: flex;
        justify-content: center;
      }
      .theme-toggle {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 4px;
        transition: background-color 0.2s;
        color: var(--text-active);
      }
      .theme-toggle:hover {
        background: var(--hover-color);
      }
      .sidebar-group {
        margin: 1rem;
        margin-bottom: 1.5rem;
      }
      .sidebar-group h3 {
        font-size: 0.9rem;
        color: var(--text-secondary);
        margin-bottom: 0.5rem;
        text-transform: capitalize;
        font-weight: normal;
      }
      .sidebar ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .sidebar li {
        padding: 0.5rem 0.75rem;
        cursor: pointer;
        border-radius: 4px;
        margin-bottom: 2px;
        font-size: 0.9rem;
        color: var(--text-primary);
      }
      .sidebar li:hover {
        background: var(--hover-color);
      }
      .sidebar li.active {
        background: var(--active-color);
        color: var(--text-active);
      }
    `}</style>
  );
}
