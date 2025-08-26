// src/components/TierUpgradeModal.jsx
import React from 'react';
import Modal from './ui/Modal';
import Button from './ui/Button';

const TierUpgradeModal = ({ isOpen, onClose, onUpgrade }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <h2>Upgrade Your Tier</h2>
    <p>Unlock premium features and advanced bots.</p>
    <Button variant="primary" onClick={onUpgrade}>Upgrade Now</Button>
    <Button variant="secondary" onClick={onClose}>Maybe Later</Button>
  </Modal>
);

export default TierUpgradeModal;
