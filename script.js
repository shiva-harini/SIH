// DOM Elements
const rescueBtn = document.getElementById('rescueBtn');
const contactsBtn = document.getElementById('contactsBtn');
const messageBox = document.getElementById('messageBox');
const messageTitle = document.getElementById('messageTitle');
const messageBody = document.getElementById('messageBody');
const closeMsgBtn = document.getElementById('closeMsgBtn');
const contactsModal = document.getElementById('contactsModal');
const closeContactsBtn = document.getElementById('closeContactsBtn');
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

// Data Objects
const emergencyContacts = [
    { name: 'Fire Department', number: '101', type: 'fire' },
    { name: 'Police', number: '100', type: 'police' },
    { name: 'Ambulance', number: '108', type: 'medical' },
    { name: 'Disaster Management', number: '1077', type: 'disaster' },
    { name: 'Women Helpline', number: '181', type: 'women' },
    { name: 'Child Helpline', number: '1098', type: 'child' }
];

const currentAlerts = [
    {
        type: 'Cyclone Warning',
        severity: 'high',
        location: 'Bay of Bengal Coast',
        time: '2 hours ago',
        description: 'Severe cyclonic storm approaching. Evacuate immediately.'
    },
    {
        type: 'Flood Alert',
        severity: 'medium',
        location: 'Eastern Districts',
        time: '5 hours ago',
        description: 'Heavy rainfall causing water level rise in major rivers.'
    },
    {
        type: 'Heat Wave',
        severity: 'low',
        location: 'Northern Plains',
        time: '1 day ago',
        description: 'Temperature expected to reach 45°C. Stay hydrated.'
    }
];

const upcomingDisasters = [
    {
        type: 'Cyclone Watch',
        location: 'Bay of Bengal',
        timeline: '3-5 days',
        description: 'Expected to make landfall near Odisha coast.'
    },
    {
        type: 'High Flood Alert',
        location: 'Eastern India',
        timeline: '1-2 weeks',
        description: 'Heavy rainfall predicted. River levels may rise rapidly.'
    },
    {
        type: 'Monsoon Alert',
        location: 'Central India',
        timeline: '3 weeks',
        description: 'Extended heavy monsoon expected, increasing flood risk.'
    }
];

const safePlaces = [
    { name: 'Community Hall (Evacuation Shelter)', distance: '0.5 km', capacity: '500 people', type: 'shelter' },
    { name: 'Local School (Designated Shelter)', distance: '1.2 km', capacity: '300 people', type: 'school' },
    { name: 'District Hospital', distance: '1.8 km', capacity: 'Medical Aid', type: 'hospital' },
    { name: 'Public Library', distance: '2.1 km', capacity: '150 people', type: 'building' },
    { name: 'Sports Complex', distance: '2.5 km', capacity: '1000 people', type: 'sports' }
];

const precautions = [
    {
        title: 'General Precautions for all Disasters',
        items: [
            'Stay calm and do not panic.',
            'Have an emergency kit ready with food, water, medicine, and important documents.',
            'Listen to official news and emergency broadcasts for instructions.',
            'Know the evacuation routes and safe places in your area.',
            'Check on your family, friends, and neighbors to ensure they are safe.'
        ]
