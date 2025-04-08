import React, { useState, useEffect } from 'react';
import './PatientHealthProfile.scss';
import {
    FaUserAlt,
    FaAllergies,
    FaNotesMedical,
    FaFileAlt,
    FaIdCard,
    FaPencilAlt,
    FaCheck,
    FaTimes,
    FaShieldAlt,
    FaHistory,
    FaExclamationTriangle
} from 'react-icons/fa';

export const PatientHealthProfile = () => {
    // Sample data - in a real app, this would come from your API/backend
    const [personalInfo, setPersonalInfo] = useState({
        firstName: 'Yaman',
        lastName: 'Ajlouni',
        dateOfBirth: '1990-06-15',
        gender: 'Male',
        bloodType: 'O+',
        height: '180 cm',
        weight: '75 kg',
        emailAddress: 'yaman.ajlouni@example.com',
        phoneNumber: '(555) 123-4567',
        address: '123 Main Street, Anytown, CA 12345',
        emergencyContact: {
            name: 'Sarah Ajlouni',
            relationship: 'Spouse',
            phoneNumber: '(555) 987-6543'
        }
    });

    const [allergies, setAllergies] = useState([
        {
            id: 1,
            allergen: 'Penicillin',
            severity: 'High',
            reaction: 'Hives, difficulty breathing',
            diagnosedDate: '2015-03-20',
            notes: 'Avoid all penicillin-based antibiotics'
        },
        {
            id: 2,
            allergen: 'Peanuts',
            severity: 'Moderate',
            reaction: 'Skin rash, swelling',
            diagnosedDate: '2010-08-12',
            notes: 'Avoid all peanut products'
        }
    ]);

    const [medicalConditions, setMedicalConditions] = useState([
        {
            id: 1,
            condition: 'Hypertension',
            diagnosedDate: '2018-05-10',
            treatingPhysician: 'Dr. Smith',
            status: 'Active',
            notes: 'Controlled with medication'
        },
        {
            id: 2,
            condition: 'Asthma',
            diagnosedDate: '2005-11-23',
            treatingPhysician: 'Dr. Johnson',
            status: 'Active',
            notes: 'Mild, exercise-induced'
        }
    ]);

    const [insuranceInfo, setInsuranceInfo] = useState({
        provider: 'HealthPlus Insurance',
        policyNumber: 'HP-12345678',
        groupNumber: 'G-9876543',
        memberId: 'M-12345-67',
        startDate: '2023-01-01',
        coverageType: 'Family',
        primaryCardholder: 'Yaman Ajlouni',
        relationship: 'Self',
        copay: {
            primaryCare: '$20',
            specialist: '$40',
            emergency: '$150',
            prescription: '$10/$30/$50'
        }
    });

    const [medicalHistory, setMedicalHistory] = useState([
        {
            id: 1,
            type: 'Surgery',
            procedure: 'Appendectomy',
            date: '2012-07-15',
            provider: 'General Hospital',
            physician: 'Dr. Williams',
            notes: 'No complications'
        },
        {
            id: 2,
            type: 'Hospitalization',
            procedure: 'Pneumonia treatment',
            date: '2016-02-03',
            provider: 'County Medical Center',
            physician: 'Dr. Martinez',
            notes: '5-day stay, full recovery'
        }
    ]);

    const [activeTab, setActiveTab] = useState('personal');
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    // Simulate loading state
    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 800);
    }, []);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setIsEditing(false);
    };

    const startEditing = (data) => {
        setEditedData(data);
        setIsEditing(true);
    };

    const cancelEditing = () => {
        setIsEditing(false);
        setEditedData({});
    };

    const saveChanges = () => {
        // In a real app, this would send the updated data to your backend
        // For now, we'll just update the state directly
        switch (activeTab) {
            case 'personal':
                setPersonalInfo(editedData);
                break;
            case 'allergies':
                if (editedData.id) {
                    setAllergies(allergies.map(allergy =>
                        allergy.id === editedData.id ? editedData : allergy
                    ));
                } else {
                    setAllergies([...allergies, { ...editedData, id: allergies.length + 1 }]);
                }
                break;
            case 'conditions':
                if (editedData.id) {
                    setMedicalConditions(medicalConditions.map(condition =>
                        condition.id === editedData.id ? editedData : condition
                    ));
                } else {
                    setMedicalConditions([...medicalConditions, { ...editedData, id: medicalConditions.length + 1 }]);
                }
                break;
            case 'insurance':
                setInsuranceInfo(editedData);
                break;
            case 'history':
                if (editedData.id) {
                    setMedicalHistory(medicalHistory.map(record =>
                        record.id === editedData.id ? editedData : record
                    ));
                } else {
                    setMedicalHistory([...medicalHistory, { ...editedData, id: medicalHistory.length + 1 }]);
                }
                break;
            default:
                break;
        }
        setIsEditing(false);
        setEditedData({});
    };

    const renderPersonalInfoContent = () => {
        if (isEditing) {
            return (
                <div className="edit-form personal-info-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                value={editedData.firstName || ''}
                                onChange={(e) => setEditedData({ ...editedData, firstName: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                value={editedData.lastName || ''}
                                onChange={(e) => setEditedData({ ...editedData, lastName: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input
                                type="date"
                                value={editedData.dateOfBirth || ''}
                                onChange={(e) => setEditedData({ ...editedData, dateOfBirth: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Gender</label>
                            <select
                                value={editedData.gender || ''}
                                onChange={(e) => setEditedData({ ...editedData, gender: e.target.value })}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                                <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Blood Type</label>
                            <select
                                value={editedData.bloodType || ''}
                                onChange={(e) => setEditedData({ ...editedData, bloodType: e.target.value })}
                            >
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Height</label>
                            <input
                                type="text"
                                value={editedData.height || ''}
                                onChange={(e) => setEditedData({ ...editedData, height: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Weight</label>
                            <input
                                type="text"
                                value={editedData.weight || ''}
                                onChange={(e) => setEditedData({ ...editedData, weight: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                value={editedData.emailAddress || ''}
                                onChange={(e) => setEditedData({ ...editedData, emailAddress: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                value={editedData.phoneNumber || ''}
                                onChange={(e) => setEditedData({ ...editedData, phoneNumber: e.target.value })}
                            />
                        </div>
                        <div className="form-group span-2">
                            <label>Address</label>
                            <input
                                type="text"
                                value={editedData.address || ''}
                                onChange={(e) => setEditedData({ ...editedData, address: e.target.value })}
                            />
                        </div>
                    </div>

                    <h4 className="section-subheading">Emergency Contact</h4>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                value={editedData.emergencyContact?.name || ''}
                                onChange={(e) => setEditedData({
                                    ...editedData,
                                    emergencyContact: { ...(editedData.emergencyContact || {}), name: e.target.value }
                                })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Relationship</label>
                            <input
                                type="text"
                                value={editedData.emergencyContact?.relationship || ''}
                                onChange={(e) => setEditedData({
                                    ...editedData,
                                    emergencyContact: { ...(editedData.emergencyContact || {}), relationship: e.target.value }
                                })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                value={editedData.emergencyContact?.phoneNumber || ''}
                                onChange={(e) => setEditedData({
                                    ...editedData,
                                    emergencyContact: { ...(editedData.emergencyContact || {}), phoneNumber: e.target.value }
                                })}
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button className="action-btn secondary" onClick={cancelEditing}>
                            <FaTimes /> Cancel
                        </button>
                        <button className="action-btn primary" onClick={saveChanges}>
                            <FaCheck /> Save Changes
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="info-display personal-info-display">
                <div className="profile-header">
                    <div className="profile-avatar">
                        <FaUserAlt />
                    </div>
                    <div className="profile-name">
                        <h3>{personalInfo.firstName} {personalInfo.lastName}</h3>
                        <p className="profile-subtitle">Patient ID: PT-12345678</p>
                    </div>
                    <button className="edit-btn" onClick={() => startEditing({ ...personalInfo })}>
                        <FaPencilAlt /> Edit Profile
                    </button>
                </div>

                <div className="info-grid">
                    <div className="info-group">
                        <h4>Personal</h4>
                        <div className="info-items">
                            <div className="info-item">
                                <span className="info-label">Date of Birth</span>
                                <span className="info-value">{new Date(personalInfo.dateOfBirth).toLocaleDateString()}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Gender</span>
                                <span className="info-value">{personalInfo.gender}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Blood Type</span>
                                <span className="info-value">{personalInfo.bloodType}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Height</span>
                                <span className="info-value">{personalInfo.height}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Weight</span>
                                <span className="info-value">{personalInfo.weight}</span>
                            </div>
                        </div>
                    </div>

                    <div className="info-group">
                        <h4>Contact Information</h4>
                        <div className="info-items">
                            <div className="info-item">
                                <span className="info-label">Email</span>
                                <span className="info-value">{personalInfo.emailAddress}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Phone</span>
                                <span className="info-value">{personalInfo.phoneNumber}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Address</span>
                                <span className="info-value">{personalInfo.address}</span>
                            </div>
                        </div>
                    </div>

                    <div className="info-group">
                        <h4>Emergency Contact</h4>
                        <div className="info-items">
                            <div className="info-item">
                                <span className="info-label">Name</span>
                                <span className="info-value">{personalInfo.emergencyContact.name}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Relationship</span>
                                <span className="info-value">{personalInfo.emergencyContact.relationship}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Phone</span>
                                <span className="info-value">{personalInfo.emergencyContact.phoneNumber}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderAllergiesContent = () => {
        if (isEditing) {
            return (
                <div className="edit-form allergies-form">
                    <div className="form-grid">
                        <div className="form-group span-2">
                            <label>Allergen</label>
                            <input
                                type="text"
                                value={editedData.allergen || ''}
                                onChange={(e) => setEditedData({ ...editedData, allergen: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Severity</label>
                            <select
                                value={editedData.severity || ''}
                                onChange={(e) => setEditedData({ ...editedData, severity: e.target.value })}
                            >
                                <option value="Low">Low</option>
                                <option value="Moderate">Moderate</option>
                                <option value="High">High</option>
                                <option value="Severe">Severe</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Diagnosed Date</label>
                            <input
                                type="date"
                                value={editedData.diagnosedDate || ''}
                                onChange={(e) => setEditedData({ ...editedData, diagnosedDate: e.target.value })}
                            />
                        </div>
                        <div className="form-group span-2">
                            <label>Reaction</label>
                            <input
                                type="text"
                                value={editedData.reaction || ''}
                                onChange={(e) => setEditedData({ ...editedData, reaction: e.target.value })}
                            />
                        </div>
                        <div className="form-group span-2">
                            <label>Notes</label>
                            <textarea
                                value={editedData.notes || ''}
                                onChange={(e) => setEditedData({ ...editedData, notes: e.target.value })}
                                rows="3"
                            ></textarea>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button className="action-btn secondary" onClick={cancelEditing}>
                            <FaTimes /> Cancel
                        </button>
                        <button className="action-btn primary" onClick={saveChanges}>
                            <FaCheck /> {editedData.id ? 'Update Allergy' : 'Add Allergy'}
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="info-display allergies-display">
                <div className="section-header">
                    <h3>Allergies & Sensitivities</h3>
                    <button className="add-btn" onClick={() => startEditing({})}>
                        + Add New Allergy
                    </button>
                </div>

                {allergies.length === 0 ? (
                    <div className="empty-state">
                        <FaAllergies className="empty-icon" />
                        <p>No allergies on record</p>
                        <button className="action-btn secondary" onClick={() => startEditing({})}>
                            Add Allergy
                        </button>
                    </div>
                ) : (
                    <div className="allergies-list">
                        {allergies.map(allergy => (
                            <div className="allergy-card" key={allergy.id}>
                                <div className="allergy-header">
                                    <div className="allergy-title">
                                        <h4>{allergy.allergen}</h4>
                                        <span className={`severity-badge severity-${allergy.severity.toLowerCase()}`}>
                                            {allergy.severity} Severity
                                        </span>
                                    </div>
                                    <button className="edit-btn small" onClick={() => startEditing({ ...allergy })}>
                                        <FaPencilAlt />
                                    </button>
                                </div>
                                <div className="allergy-details">
                                    <div className="allergy-item">
                                        <span className="allergy-label">Reaction:</span>
                                        <span className="allergy-value">{allergy.reaction}</span>
                                    </div>
                                    <div className="allergy-item">
                                        <span className="allergy-label">Diagnosed:</span>
                                        <span className="allergy-value">{new Date(allergy.diagnosedDate).toLocaleDateString()}</span>
                                    </div>
                                    {allergy.notes && (
                                        <div className="allergy-item notes">
                                            <span className="allergy-label">Notes:</span>
                                            <span className="allergy-value">{allergy.notes}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const renderMedicalConditionsContent = () => {
        if (isEditing) {
            return (
                <div className="edit-form conditions-form">
                    <div className="form-grid">
                        <div className="form-group span-2">
                            <label>Condition</label>
                            <input
                                type="text"
                                value={editedData.condition || ''}
                                onChange={(e) => setEditedData({ ...editedData, condition: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Diagnosed Date</label>
                            <input
                                type="date"
                                value={editedData.diagnosedDate || ''}
                                onChange={(e) => setEditedData({ ...editedData, diagnosedDate: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Status</label>
                            <select
                                value={editedData.status || ''}
                                onChange={(e) => setEditedData({ ...editedData, status: e.target.value })}
                            >
                                <option value="Active">Active</option>
                                <option value="Resolved">Resolved</option>
                                <option value="In Remission">In Remission</option>
                                <option value="Chronic">Chronic</option>
                            </select>
                        </div>
                        <div className="form-group span-2">
                            <label>Treating Physician</label>
                            <input
                                type="text"
                                value={editedData.treatingPhysician || ''}
                                onChange={(e) => setEditedData({ ...editedData, treatingPhysician: e.target.value })}
                            />
                        </div>
                        <div className="form-group span-2">
                            <label>Notes</label>
                            <textarea
                                value={editedData.notes || ''}
                                onChange={(e) => setEditedData({ ...editedData, notes: e.target.value })}
                                rows="3"
                            ></textarea>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button className="action-btn secondary" onClick={cancelEditing}>
                            <FaTimes /> Cancel
                        </button>
                        <button className="action-btn primary" onClick={saveChanges}>
                            <FaCheck /> {editedData.id ? 'Update Condition' : 'Add Condition'}
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="info-display conditions-display">
                <div className="section-header">
                    <h3>Medical Conditions</h3>
                    <button className="add-btn" onClick={() => startEditing({})}>
                        + Add New Condition
                    </button>
                </div>

                {medicalConditions.length === 0 ? (
                    <div className="empty-state">
                        <FaNotesMedical className="empty-icon" />
                        <p>No medical conditions on record</p>
                        <button className="action-btn secondary" onClick={() => startEditing({})}>
                            Add Condition
                        </button>
                    </div>
                ) : (
                    <div className="conditions-list">
                        {medicalConditions.map(condition => (
                            <div className="condition-card" key={condition.id}>
                                <div className="condition-header">
                                    <div className="condition-title">
                                        <h4>{condition.condition}</h4>
                                        <span className={`status-badge status-${condition.status.toLowerCase().replace(/\s+/g, '-')}`}>
                                            {condition.status}
                                        </span>
                                    </div>
                                    <button className="edit-btn small" onClick={() => startEditing({ ...condition })}>
                                        <FaPencilAlt />
                                    </button>
                                </div>
                                <div className="condition-details">
                                    <div className="condition-item">
                                        <span className="condition-label">Diagnosed:</span>
                                        <span className="condition-value">{new Date(condition.diagnosedDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="condition-item">
                                        <span className="condition-label">Physician:</span>
                                        <span className="condition-value">{condition.treatingPhysician}</span>
                                    </div>
                                    {condition.notes && (
                                        <div className="condition-item notes">
                                            <span className="condition-label">Notes:</span>
                                            <span className="condition-value">{condition.notes}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const renderInsuranceContent = () => {
        if (isEditing) {
            return (
                <div className="edit-form insurance-form">
                    <div className="form-grid">
                        <div className="form-group span-2">
                            <label>Insurance Provider</label>
                            <input
                                type="text"
                                value={editedData.provider || ''}
                                onChange={(e) => setEditedData({ ...editedData, provider: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Policy Number</label>
                            <input
                                type="text"
                                value={editedData.policyNumber || ''}
                                onChange={(e) => setEditedData({ ...editedData, policyNumber: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Group Number</label>
                            <input
                                type="text"
                                value={editedData.groupNumber || ''}
                                onChange={(e) => setEditedData({ ...editedData, groupNumber: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Member ID</label>
                            <input
                                type="text"
                                value={editedData.memberId || ''}
                                onChange={(e) => setEditedData({ ...editedData, memberId: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Start Date</label>
                            <input
                                type="date"
                                value={editedData.startDate || ''}
                                onChange={(e) => setEditedData({ ...editedData, startDate: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Coverage Type</label>
                            <select
                                value={editedData.coverageType || ''}
                                onChange={(e) => setEditedData({ ...editedData, coverageType: e.target.value })}
                            >
                                <option value="Individual">Individual</option>
                                <option value="Family">Family</option>
                                <option value="Group">Group</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Primary Cardholder</label>
                            <input
                                type="text"
                                value={editedData.primaryCardholder || ''}
                                onChange={(e) => setEditedData({ ...editedData, primaryCardholder: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Relationship to Cardholder</label>
                            <select
                                value={editedData.relationship || ''}
                                onChange={(e) => setEditedData({ ...editedData, relationship: e.target.value })}
                            >
                                <option value="Self">Self</option>
                                <option value="Spouse">Spouse</option>
                                <option value="Child">Child</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <h4 className="section-subheading">Copay Information</h4>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Primary Care</label>
                            <input
                                type="text"
                                value={editedData.copay?.primaryCare || ''}
                                onChange={(e) => setEditedData({
                                    ...editedData,
                                    copay: { ...(editedData.copay || {}), primaryCare: e.target.value }
                                })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Specialist</label>
                            <input
                                type="text"
                                value={editedData.copay?.specialist || ''}
                                onChange={(e) => setEditedData({
                                    ...editedData,
                                    copay: { ...(editedData.copay || {}), specialist: e.target.value }
                                })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Emergency</label>
                            <input
                                type="text"
                                value={editedData.copay?.emergency || ''}
                                onChange={(e) => setEditedData({
                                    ...editedData,
                                    copay: { ...(editedData.copay || {}), emergency: e.target.value }
                                })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Prescription Tiers</label>
                            <input
                                type="text"
                                value={editedData.copay?.prescription || ''}
                                onChange={(e) => setEditedData({
                                    ...editedData,
                                    copay: { ...(editedData.copay || {}), prescription: e.target.value }
                                })}
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button className="action-btn secondary" onClick={cancelEditing}>
                            <FaTimes /> Cancel
                        </button>
                        <button className="action-btn primary" onClick={saveChanges}>
                            <FaCheck /> Save Changes
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="info-display insurance-display">
                <div className="insurance-card">
                    <div className="insurance-card-header">
                        <h3>{insuranceInfo.provider}</h3>
                        <div className="card-actions">
                            <button className="edit-btn" onClick={() => startEditing({ ...insuranceInfo })}>
                                <FaPencilAlt /> Edit
                            </button>
                        </div>
                    </div>

                    <div className="insurance-card-content">
                        <div className="member-info-section">
                            <div className="member-identifier">
                                <div>
                                    <span className="label">Member ID</span>
                                    <span className="value highlight">{insuranceInfo.memberId}</span>
                                </div>
                                <div>
                                    <span className="label">Group #</span>
                                    <span className="value">{insuranceInfo.groupNumber}</span>
                                </div>
                                <div>
                                    <span className="label">Policy #</span>
                                    <span className="value">{insuranceInfo.policyNumber}</span>
                                </div>
                            </div>

                            <div className="member-details">
                                <div>
                                    <span className="label">Member Name</span>
                                    <span className="value">{insuranceInfo.primaryCardholder}</span>
                                </div>
                                <div>
                                    <span className="label">Relationship</span>
                                    <span className="value">{insuranceInfo.relationship}</span>
                                </div>
                                <div>
                                    <span className="label">Coverage Type</span>
                                    <span className="value">{insuranceInfo.coverageType}</span>
                                </div>
                                <div>
                                    <span className="label">Effective Date</span>
                                    <span className="value">{new Date(insuranceInfo.startDate).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="copay-section">
                            <h4>Copay Information</h4>
                            <div className="copay-grid">
                                <div className="copay-item">
                                    <span className="copay-label">Primary Care</span>
                                    <span className="copay-value">{insuranceInfo.copay.primaryCare}</span>
                                </div>
                                <div className="copay-item">
                                    <span className="copay-label">Specialist</span>
                                    <span className="copay-value">{insuranceInfo.copay.specialist}</span>
                                </div>
                                <div className="copay-item">
                                    <span className="copay-label">Emergency</span>
                                    <span className="copay-value">{insuranceInfo.copay.emergency}</span>
                                </div>
                                <div className="copay-item">
                                    <span className="copay-label">Prescription</span>
                                    <span className="copay-value">{insuranceInfo.copay.prescription}</span>
                                </div>
                            </div>
                        </div>

                        <div className="card-footer">
                            <FaShieldAlt className="security-icon" />
                            <p className="security-note">Your insurance information is securely stored and encrypted.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderMedicalHistoryContent = () => {
        if (isEditing) {
            return (
                <div className="edit-form history-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Type</label>
                            <select
                                value={editedData.type || ''}
                                onChange={(e) => setEditedData({ ...editedData, type: e.target.value })}
                            >
                                <option value="Surgery">Surgery</option>
                                <option value="Hospitalization">Hospitalization</option>
                                <option value="Vaccination">Vaccination</option>
                                <option value="Major Illness">Major Illness</option>
                                <option value="Injury">Injury</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group span-2">
                            <label>Procedure/Description</label>
                            <input
                                type="text"
                                value={editedData.procedure || ''}
                                onChange={(e) => setEditedData({ ...editedData, procedure: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Date</label>
                            <input
                                type="date"
                                value={editedData.date || ''}
                                onChange={(e) => setEditedData({ ...editedData, date: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Provider/Facility</label>
                            <input
                                type="text"
                                value={editedData.provider || ''}
                                onChange={(e) => setEditedData({ ...editedData, provider: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Physician</label>
                            <input
                                type="text"
                                value={editedData.physician || ''}
                                onChange={(e) => setEditedData({ ...editedData, physician: e.target.value })}
                            />
                        </div>
                        <div className="form-group span-2">
                            <label>Notes</label>
                            <textarea
                                value={editedData.notes || ''}
                                onChange={(e) => setEditedData({ ...editedData, notes: e.target.value })}
                                rows="3"
                            ></textarea>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button className="action-btn secondary" onClick={cancelEditing}>
                            <FaTimes /> Cancel
                        </button>
                        <button className="action-btn primary" onClick={saveChanges}>
                            <FaCheck /> {editedData.id ? 'Update Record' : 'Add Record'}
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="info-display history-display">
                <div className="section-header">
                    <h3>Medical History</h3>
                    <button className="add-btn" onClick={() => startEditing({})}>
                        + Add New Record
                    </button>
                </div>

                {medicalHistory.length === 0 ? (
                    <div className="empty-state">
                        <FaHistory className="empty-icon" />
                        <p>No medical history records found</p>
                        <button className="action-btn secondary" onClick={() => startEditing({})}>
                            Add Record
                        </button>
                    </div>
                ) : (
                    <div className="timeline">
                        {medicalHistory.map(record => (
                            <div className="timeline-item" key={record.id}>
                                <div className="timeline-marker">
                                    <div className="timeline-icon">
                                        {record.type === 'Surgery' && <FaNotesMedical />}
                                        {record.type === 'Hospitalization' && <FaExclamationTriangle />}
                                        {record.type === 'Vaccination' && <FaShieldAlt />}
                                        {(record.type !== 'Surgery' && record.type !== 'Hospitalization' && record.type !== 'Vaccination') && <FaFileAlt />}
                                    </div>
                                    <div className="timeline-date">
                                        {new Date(record.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                                    </div>
                                </div>
                                <div className="timeline-content">
                                    <div className="timeline-header">
                                        <h4>{record.procedure}</h4>
                                        <span className="badge">{record.type}</span>
                                        <button className="edit-btn small" onClick={() => startEditing({ ...record })}>
                                            <FaPencilAlt />
                                        </button>
                                    </div>
                                    <div className="timeline-details">
                                        <div className="timeline-detail">
                                            <span className="detail-label">Provider:</span>
                                            <span className="detail-value">{record.provider}</span>
                                        </div>
                                        <div className="timeline-detail">
                                            <span className="detail-label">Physician:</span>
                                            <span className="detail-value">{record.physician}</span>
                                        </div>
                                        {record.notes && (
                                            <div className="timeline-detail notes">
                                                <span className="detail-label">Notes:</span>
                                                <span className="detail-value">{record.notes}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const renderActiveTabContent = () => {
        switch (activeTab) {
            case 'personal':
                return renderPersonalInfoContent();
            case 'allergies':
                return renderAllergiesContent();
            case 'conditions':
                return renderMedicalConditionsContent();
            case 'insurance':
                return renderInsuranceContent();
            case 'history':
                return renderMedicalHistoryContent();
            default:
                return renderPersonalInfoContent();
        }
    };

    return (
        <div className="patient-health-profile">
            <div className="profile-container">
                <div className="profile-sidebar">
                    <div className="sidebar-header">
                        <h2>Health Profile</h2>
                    </div>
                    <div className="sidebar-nav">
                        <button
                            className={`nav-item ${activeTab === 'personal' ? 'active' : ''}`}
                            onClick={() => handleTabChange('personal')}
                        >
                            <FaUserAlt className="nav-icon" />
                            <span>Personal Information</span>
                        </button>
                        <button
                            className={`nav-item ${activeTab === 'allergies' ? 'active' : ''}`}
                            onClick={() => handleTabChange('allergies')}
                        >
                            <FaAllergies className="nav-icon" />
                            <span>Allergies</span>
                            {allergies.length > 0 && <span className="badge">{allergies.length}</span>}
                        </button>
                        <button
                            className={`nav-item ${activeTab === 'conditions' ? 'active' : ''}`}
                            onClick={() => handleTabChange('conditions')}
                        >
                            <FaNotesMedical className="nav-icon" />
                            <span>Medical Conditions</span>
                            {medicalConditions.length > 0 && <span className="badge">{medicalConditions.length}</span>}
                        </button>
                        <button
                            className={`nav-item ${activeTab === 'insurance' ? 'active' : ''}`}
                            onClick={() => handleTabChange('insurance')}
                        >
                            <FaIdCard className="nav-icon" />
                            <span>Insurance Information</span>
                        </button>
                        <button
                            className={`nav-item ${activeTab === 'history' ? 'active' : ''}`}
                            onClick={() => handleTabChange('history')}
                        >
                            <FaHistory className="nav-icon" />
                            <span>Medical History</span>
                            {medicalHistory.length > 0 && <span className="badge">{medicalHistory.length}</span>}
                        </button>
                    </div>
                    <div className="sidebar-footer">
                        <button className="print-btn">
                            <FaFileAlt /> Print Health Record
                        </button>
                    </div>
                </div>

                <div className="profile-content">
                    {!isLoaded ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>Loading health information...</p>
                        </div>
                    ) : (
                        renderActiveTabContent()
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientHealthProfile;