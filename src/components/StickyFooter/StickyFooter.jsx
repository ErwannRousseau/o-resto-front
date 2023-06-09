import React from 'react';
import './StickyFooter.scss';

import { FaRegCalendarAlt, FaPhoneAlt } from 'react-icons/fa';

// Il faudra rajouter des LinkTo et faire en sorte que les icônes et le texte soit cliquable
function StickyFooter() {
  return (
    <div className="StickyFooter">
      <div className="stickyFooter-items">
        <div className="reserver">
          <FaRegCalendarAlt />
          <p>Réserver</p>
        </div>
        <div className="appeler">
          <FaPhoneAlt />
          <p>Contactez-nous</p>
        </div>
      </div>
    </div>
  );
}

export default StickyFooter;