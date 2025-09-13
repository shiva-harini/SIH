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
    },
    {
        title: 'During an Earthquake',
        items: [
            'Drop, cover, and hold on.',
            'Stay away from windows, mirrors, and anything that could fall.',
            'If you are outdoors, move to a clear area away from buildings, trees, and power lines.',
            'Do not use elevators.',
            'After the shaking stops, check for injuries and hazards.'
        ]
    },
    {
        title: 'During a Flood',
        items: [
            'Move to higher ground immediately.',
            'Do not walk or drive through floodwaters.',
            'Listen to official updates and evacuation orders.',
            'Turn off all utilities at the main power switch if you can do so safely.',
            'Stay away from downed power lines.'
        ]
    },
    {
        title: 'During a Cyclone',
        items: [
            'Stay indoors in a safe room, away from windows.',
            'Secure all loose items outdoors.',
            'Have an emergency kit ready with food, water, and first aid.',
            'Listen to a battery-powered radio for official updates.',
            'Do not go outside during the eye of the storm.'
        ]
    },
    {
        title: 'During a Fire Hazard',
        items: [
            'Sound the fire alarm and evacuate immediately.',
            'Evacuate the building using stairs, not elevators.',
            'If possible, use a fire extinguisher on small fires.',
            'Feel doors for heat before opening. If hot, use an alternate escape route.',
            'Stay low to avoid smoke inhalation.'
        ]
    },
    {
        title: 'During a Chemical Hazard',
        items: [
            'Stay indoors and close all windows and doors.',
            'Turn off air conditioners and ventilation systems.',
            'Listen to emergency broadcasts for "shelter-in-place" or "evacuate" orders.',
            'Cover your nose and mouth with a damp cloth if you must leave.',
            'Move away from the contaminated area if outdoors.'
        ]
    }
];

const emergencyKit = [
    'Water (1 gallon per person per day for 3 days)',
    'Non-perishable food (3-day supply)',
    'Battery-powered or hand crank radio',
    'Flashlight and extra batteries',
    'First aid kit and medications',
    'Whistle for signaling help',
    'Dust masks and plastic sheeting',
    'Moist towelettes and garbage bags',
    'Wrench or pliers to turn off utilities',
    'Manual can opener',
    'Cell phone with chargers and backup battery',
    'Cash and credit cards',
    'Emergency contact information',
    'Copies of important documents',
    'Sleeping bags and blankets',
    'Change of clothing and sturdy shoes',
    'Fire extinguisher',
    'Matches in waterproof container'
];

const importantDocuments = [
    'Insurance policies (home, auto, life)',
    'Identification (driver\'s license, passport)',
    'Bank account records and credit card info',
    'Medical records and prescription info',
    'Property deeds and mortgage papers',
    'Tax records',
    'Birth, marriage, death certificates',
    'Social security cards',
    'Emergency contact list',
    'Inventory of household goods',
    'Recent photos of family members',
    'Backup of computer files'
];

// Utility Functions
function showMessage(title, body) {
    messageTitle.textContent = title;
    messageBody.textContent = body;
    messageBox.classList.remove('hidden');
    messageBox.classList.add('flex');
}

function hideMessage() {
    messageBox.classList.remove('flex');
    messageBox.classList.add('hidden');
}

function showContacts() {
    contactsModal.classList.remove('hidden');
    contactsModal.classList.add('flex');
}

function hideContacts() {
    contactsModal.classList.remove('flex');
    contactsModal.classList.add('hidden');
}

function getUserLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                callback({
                    success: true,
                    latitude: latitude.toFixed(4),
                    longitude: longitude.toFixed(4)
                });
            },
            error => {
                callback({
                    success: false,
                    message: 'Location access denied. Using simulated location.',
                    latitude: '20.5937',
                    longitude: '78.9629'
                });
            }
        );
    } else {
        callback({
            success: false,
            message: 'Geolocation not supported. Using simulated location.',
            latitude: '20.5937',
            longitude: '78.9629'
        });
    }
}

// Tab Navigation Functions
function switchTab(targetTab) {
    // Remove active class from all tabs and contents
    tabButtons.forEach(button => button.classList.remove('active-tab'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to target tab and content
    const targetButton = document.querySelector(`[data-tab="${targetTab}"]`);
    const targetContent = document.getElementById(`${targetTab}-tab`);
    
    if (targetButton && targetContent) {
        targetButton.classList.add('active-tab');
        targetContent.classList.add('active');
    }
}

// Content Population Functions
function populateContacts() {
    const contactsList = document.getElementById('contactsList');
    contactsList.innerHTML = '';
    
    emergencyContacts.forEach(contact => {
        const contactDiv = document.createElement('div');
        contactDiv.className = 'contact-item';
        contactDiv.innerHTML = `
            <div class="flex items-center">
                <div class="w-8 h-8 rounded-full bg-blue-600 bg-opacity-20 flex items-center justify-center mr-3">
                    <span class="text-blue-400 text-xs font-bold">${contact.type.charAt(0).toUpperCase()}</span>
                </div>
                <span class="text-slate-200">${contact.name}</span>
            </div>
            <div class="flex items-center space-x-2">
                <span class="contact-number">${contact.number}</span>
                <button onclick="callNumber('${contact.number}')" class="text-green-400 hover:text-green-300">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                </button>
            </div>
        `;
        contactsList.appendChild(contactDiv);
    });
}

function populateAlerts() {
    const currentAlertsDiv = document.getElementById('currentAlerts');
    currentAlertsDiv.innerHTML = '';
    
    currentAlerts.forEach(alert => {
        const alertDiv = document.createElement('div');
        alertDiv.className = `p-4 rounded-xl border alert-${alert.severity}`;
        alertDiv.innerHTML = `
            <div class="flex items-center justify-between mb-2">
                <h4 class="font-bold text-lg">${alert.type}</h4>
                <span class="text-xs px-2 py-1 rounded-full bg-opacity-20 ${
                    alert.severity === 'high' ? 'bg-red-500 text-red-200' :
                    alert.severity === 'medium' ? 'bg-yellow-500 text-yellow-200' :
                    'bg-green-500 text-green-200'
                }">${alert.severity.toUpperCase()}</span>
            </div>
            <p class="text-sm mb-2">${alert.description}</p>
            <div class="flex justify-between text-xs opacity-75">
                <span>📍 ${alert.location}</span>
                <span>🕒 ${alert.time}</span>
            </div>
        `;
        currentAlertsDiv.appendChild(alertDiv);
    });
    
    const upcomingDisastersDiv = document.getElementById('upcomingDisasters');
    upcomingDisastersDiv.innerHTML = '';
    
    upcomingDisasters.forEach(disaster => {
        const disasterDiv = document.createElement('div');
        disasterDiv.className = 'bg-slate-800 p-4 rounded-xl';
        disasterDiv.innerHTML = `
            <div class="flex items-center justify-between mb-2">
                <h4 class="font-bold">${disaster.type}</h4>
                <span class="text-xs text-slate-400">${disaster.timeline}</span>
            </div>
            <p class="text-sm text-slate-400 mb-2">${disaster.description}</p>
            <span class="text-xs text-slate-500">📍 ${disaster.location}</span>
        `;
        upcomingDisastersDiv.appendChild(disasterDiv);
    });
}

function populateSafePlaces() {
    const safePlacesListDiv = document.getElementById('safePlacesList');
    safePlacesListDiv.innerHTML = '';
    
    safePlaces.forEach(place => {
        const placeDiv = document.createElement('div');
        placeDiv.className = 'bg-slate-800 p-4 rounded-xl flex items-center justify-between hover:bg-slate-700 transition-colors';
        placeDiv.innerHTML = `
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-full bg-purple-600 bg-opacity-20 flex items-center justify-center">
                    ${getLocationIcon(place.type)}
                </div>
                <div>
                    <span class="text-slate-200 font-medium block">${place.name}</span>
                    <span class="text-xs text-slate-400">${place.capacity}</span>
                </div>
            </div>
            <div class="text-right">
                <span class="text-sm text-slate-400 block">${place.distance}</span>
                <button onclick="getDirections('${place.name}')" class="text-xs text-blue-400 hover:text-blue-300">
                    Get Directions
                </button>
            </div>
        `;
        safePlacesListDiv.appendChild(placeDiv);
    });
}

function populatePrecautions() {
    const precautionsListDiv = document.getElementById('precautionsList');
    precautionsListDiv.innerHTML = '';
    
    precautions.forEach(precaution => {
        const precautionDiv = document.createElement('details');
        precautionDiv.className = 'bg-slate-800 p-4 rounded-xl';
        precautionDiv.innerHTML = `
            <summary class="text-xl font-bold text-white mb-2 cursor-pointer">${precaution.title}</summary>
            <ul class="list-disc list-inside text-slate-400 space-y-2 mt-4">
                ${precaution.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        `;
        precautionsListDiv.appendChild(precautionDiv);
    });
}

function populateResources() {
    const emergencyKitDiv = document.getElementById('emergencyKit');
    emergencyKitDiv.innerHTML = '';
    
    emergencyKit.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'kit-item';
        itemDiv.innerHTML = `
            <input type="checkbox" id="kit-item-${index}" onchange="toggleKitItem(this)">
            <label for="kit-item-${index}">${item}</label>
        `;
        emergencyKitDiv.appendChild(itemDiv);
    });
    
    const importantDocsDiv = document.getElementById('importantDocs');
    importantDocsDiv.innerHTML = '';
    
    importantDocuments.forEach((doc, index) => {
        const docDiv = document.createElement('div');
        docDiv.className = 'kit-item';
        docDiv.innerHTML = `
            <input type="checkbox" id="doc-item-${index}" onchange="toggleKitItem(this)">
            <label for="doc-item-${index}">${doc}</label>
        `;
        importantDocsDiv.appendChild(docDiv);
    });
}

// Helper Functions
function getLocationIcon(type) {
    const icons = {
        shelter: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="text-purple-400">
                    <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>
                  </svg>`,
        school: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="text-purple-400">
                   <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6L23 9l-11-6zM5 13.18l7 3.82 7-3.82V11L12 14.82 5 11v2.18z"/>
                 </svg>`,
        hospital: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="text-purple-400">
                     <path d="M19 8h-2V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM15.1 8H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                   </svg>`,
        building: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="text-purple-400">
                     <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                   </svg>`,
        sports: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="text-purple-400">
                   <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                 </svg>`
    };
    return icons[type] || icons.building;
}

function toggleKitItem(checkbox) {
    const kitItem = checkbox.parentElement;
    if (checkbox.checked) {
        kitItem.classList.add('checked');
    } else {
        kitItem.classList.remove('checked');
    }
}

function callNumber(number) {
    if (confirm(`Call ${number}?`)) {
        window.location.href = `tel:${number}`;
    }
}

function getDirections(placeName) {
    showMessage('Getting Directions', `Opening navigation to ${placeName}...`);
    // In a real app, this would integrate with Google Maps or similar
}

// Event Listeners
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        switchTab(targetTab);
    });
});

rescueBtn.addEventListener('click', () => {
    rescueBtn.innerHTML = '<div class="loading-spinner mx-auto"></div>';
    rescueBtn.disabled = true;
    
    getUserLocation(location => {
        setTimeout(() => {
            const msg = `SOS alert sent successfully! Emergency services have been notified of your location (${location.latitude}, ${location.longitude}). Help is on the way.`;
            showMessage('SOS Alert Sent', msg);
            rescueBtn.innerHTML = 'SOS Sent ✓';
            rescueBtn.classList.remove('bg-red-600', 'hover:bg-red-700');
            rescueBtn.classList.add('bg-green-600', 'hover:bg-green-700');
            
            setTimeout(() => {
                rescueBtn.innerHTML = 'Send SOS';
                rescueBtn.disabled = false;
                rescueBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
                rescueBtn.classList.add('bg-red-600', 'hover:bg-red-700');
            }, 5000);
        }, 2000);
    });
});

contactsBtn.addEventListener('click', showContacts);
closeMsgBtn.addEventListener('click', hideMessage);
closeContactsBtn.addEventListener('click', hideContacts);

// Close modals when clicking outside
messageBox.addEventListener('click', (e) => {
    if (e.target === messageBox) hideMessage();
});

contactsModal.addEventListener('click', (e) => {
    if (e.target === contactsModal) hideContacts();
});

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    populateContacts();
    populateAlerts();
    populateSafePlaces();
    populatePrecautions();
    populateResources();
    
    // Show emergency tab by default
    switchTab('emergency');
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (!messageBox.classList.contains('hidden')) hideMessage();
        if (!contactsModal.classList.contains('hidden')) hideContacts();
    }
    
    // Tab navigation with number keys
    if (e.key >= '1' && e.key <= '5') {
        const tabMap = {
            '1': 'emergency',
            '2': 'alerts', 
            '3': 'locations',
            '4': 'precautions',
            '5': 'resources'
        };
        switchTab(tabMap[e.key]);
    }
});
