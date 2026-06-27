import { DropdownOption } from '../models/category.interfaces';
// ─── Display label maps ───────────────────────────────────────────────────────
 
export const ROLE_LABELS: Record<string, string> = {
  CUSTOMER:             'Customer',
  CONSULTANTS:          'Consultants',
  BUILDERS_CONTRACTORS: 'Builders / Contractors',
  VENDORS:              'Vendors',
  OTHERS:               'Others',
};

export const ROLE_OPTIONS: DropdownOption[] = [
  { value: 'CUSTOMER', label: 'Customer' },
  { value: 'CONSULTANTS', label: 'Consultants' },
  { value: 'BUILDERS_CONTRACTORS', label: 'Builders / Contractors' },
  { value: 'VENDORS', label: 'Vendors' },
  { value: 'OTHERS', label: 'Others' },
];
 
export const PROJECT_TYPE_LABELS: Record<string, string> = {
  RESIDENTIAL:    'Residential',
  COMMERCIAL:     'Commercial',
  HEALTHCARE:     'Healthcare',
  HOSPITALITY:    'Hospitality',
  EDUCATIONAL:    'Educational',
  INDUSTRIAL:     'Industrial',
  INFRASTRUCTURE: 'Infrastructure',
  INSTITUTIONAL:  'Institutional',
  CULTURAL:       'Cultural',
  WAREHOUSING:    'Warehousing',
  MIXED_USE:      'Mixed-Use',
  TRANSPORTATION: 'Transportation',
  GOVERNMENT:     'Government',
  RECREATIONAL:   'Recreational',
  IT_CENTRES:     'IT Centres',
};

export const CONSULTANT_SUB1: DropdownOption[] = [
  { value: 'DESIGNERS', label: 'Designers' },
  { value: 'ENGINEERS', label: 'Engineers' },
  { value: 'PMC',       label: 'PMC' },
  { value: 'MARKETING', label: 'Marketing' },
  { value: 'OTHERS',    label: 'Others' },
];
 
export const BUILDER_SUB1: DropdownOption[] = [
  { value: 'CORE_CONTRACTORS',               label: 'Core Contractors' },
  { value: 'CIVIL_STRUCTURAL_CONTRACTORS',   label: 'Civil & Structural Contractors' },
  { value: 'BUILDING_ENVELOPE_CONTRACTORS',  label: 'Building Envelope Contractors' },
  { value: 'MEP_CONTRACTORS',                label: 'MEP Contractors' },
  { value: 'VERTICAL_TRANSPORTATION',        label: 'Vertical Transportation Contractors' },
  { value: 'INTERIOR_FINISHING_CONTRACTORS', label: 'Interior & Finishing Contractors' },
  { value: 'EXTERNAL_WORKS_CONTRACTORS',     label: 'External Works Contractors' },
  { value: 'SPECIALIZED_CONTRACTORS',        label: 'Specialized Contractors' },
  { value: 'OPERATIONS_MAINTENANCE',         label: 'Operations & Maintenance' },
];
 
export const VENDOR_SUB1: DropdownOption[] = [
  { value: 'STRUCTURAL_CIVIL_VENDORS',        label: 'Structural & Civil Vendors' },
  { value: 'ARCHITECTURAL_VENDORS',           label: 'Architectural Vendors' },
  { value: 'MEP_VENDORS',                     label: 'MEP Vendors' },
  { value: 'FIRE_SAFETY_VENDORS',             label: 'Fire & Safety Vendors' },
  { value: 'ELV_ICT_VENDORS',                 label: 'ELV & ICT Vendors' },
  { value: 'VERTICAL_TRANSPORTATION_VENDORS', label: 'Vertical Transportation Vendors' },
  { value: 'EXTERNAL_WORKS_VENDORS',          label: 'External Works Vendors' },
  { value: 'SPECIALIZED_VENDORS',             label: 'Specialized Vendors' },
  { value: 'CONSTRUCTION_EQUIPMENT_VENDORS',  label: 'Construction Equipment Vendors' },
];
 
// ─── Sub Category 2 options per Sub Category 1 ───────────────────────────────
 
export const SUB2_BY_SUB1: Record<string, DropdownOption[]> = {
  // Consultants
  DESIGNERS: [
    { value: 'ARCHITECT',         label: 'Architect' },
    { value: 'ENVIRONMENTAL',     label: 'Environmental' },
    { value: 'URBAN_PLANNER',     label: 'Urban Planner' },
    { value: 'TOWN_PLANNER',      label: 'Town Planner' },
    { value: 'LANDSCAPE',         label: 'Landscape' },
    { value: 'INTERIOR',          label: 'Interior' },
    { value: 'CONSERVATION',      label: 'Conservation' },
    { value: 'LIGHTING',          label: 'Lighting' },
    { value: 'FACADE',            label: 'Façade' },
    { value: 'ENERGY_EFFICIENCY', label: 'Energy Efficiency' },
  ],
  ENGINEERS: [
    { value: 'STRUCTURAL',              label: 'Structural' },
    { value: 'MEP',                     label: 'MEP' },
    { value: 'FIRE_LIFE_SAFETY',        label: 'Fire & Life Safety' },
    { value: 'WATER_WASTE_MANAGEMENT',  label: 'Water & Waste Management' },
    { value: 'BIM',                     label: 'BIM' },
    { value: 'DIGITAL_FABRICATION',     label: '3D Printing / Digital Fabrication' },
    { value: 'WIND',                    label: 'Wind' },
    { value: 'HELIPAD',                 label: 'Helipad' },
    { value: 'BRIDGES',                 label: 'Bridges' },
    { value: 'SIGNAGE',                 label: 'Signage' },
    { value: 'PARKING',                 label: 'Parking' },
    { value: 'TRAFFIC',                 label: 'Traffic' },
    { value: 'TRANSPORT',               label: 'Transport' },
    { value: 'STP',                     label: 'STP' },
    { value: 'WTP',                     label: 'WTP' },
    { value: 'HVAC',                    label: 'HVAC' },
    { value: 'ACOUSTICS',               label: 'Acoustics' },
    { value: 'VERTICAL_TRANSPORTATION', label: 'Vertical Transportation' },
  ],
  PMC: [
    { value: 'PROJECT_MANAGEMENT', label: 'Project Management' },
  ],
  MARKETING: [
    { value: 'DIGITAL_MARKETING', label: 'Digital Marketing' },
  ],
  OTHERS: [
    { value: 'VASTU', label: 'Vastu' },
  ],
 
  // Builders
  CORE_CONTRACTORS: [
    { value: 'MAIN_CONTRACTOR',              label: 'Main Contractor (General Contractor)' },
    { value: 'DESIGN_BUILD_CONTRACTOR',      label: 'Design-Build Contractor' },
    { value: 'EPC_CONTRACTOR',               label: 'EPC Contractor' },
    { value: 'CM_CONTRACTOR',               label: 'Construction Management Contractor' },
  ],
  CIVIL_STRUCTURAL_CONTRACTORS: [
    { value: 'EXCAVATION',       label: 'Excavation Contractor' },
    { value: 'SHORING',          label: 'Shoring Contractor' },
    { value: 'DEWATERING',       label: 'Dewatering Contractor' },
    { value: 'FOUNDATION',       label: 'Foundation Contractor' },
    { value: 'PILING',           label: 'Piling Contractor' },
    { value: 'DIAPHRAGM_WALL',   label: 'Diaphragm Wall Contractor' },
    { value: 'CONCRETE',         label: 'Concrete Contractor' },
    { value: 'STRUCTURAL_STEEL', label: 'Structural Steel Contractor' },
    { value: 'PRECAST_CONCRETE', label: 'Precast Concrete Contractor' },
    { value: 'POST_TENSIONING',  label: 'Post-Tensioning Contractor' },
  ],
  BUILDING_ENVELOPE_CONTRACTORS: [
    { value: 'FACADE',          label: 'Facade Contractor' },
    { value: 'CURTAIN_WALL',    label: 'Curtain Wall Contractor' },
    { value: 'GLAZING',         label: 'Glazing Contractor' },
    { value: 'CLADDING',        label: 'Cladding Contractor' },
    { value: 'ROOFING',         label: 'Waterproofing Contractor' },
    { value: 'WATERPROOFING',   label: 'Waterproofing Contractor' },
  ],
  MEP_CONTRACTORS: [
    { value: 'MEP',              label: 'MEP Contractor' },
    { value: 'MECHANICAL',       label: 'Mechanical Contractor' },
    { value: 'HVAC',             label: 'HVAC Contractor' },
    { value: 'ELECTRICAL',       label: 'Electrical Contractor' },
    { value: 'PLUMBING',         label: 'Plumbing Contractor' },
    { value: 'FIRE_PROTECTION',  label: 'Fire Protection Contractor' },
    { value: 'FIRE_ALARM',       label: 'Fire Alarm Contractor' },
    { value: 'ELV',              label: 'ELV Contractor' },
    { value: 'ICT',              label: 'ICT Contractor' },
    { value: 'BMS',              label: 'BMS Contractor' },
  ],
  VERTICAL_TRANSPORTATION: [
    { value: 'ELEVATOR',        label: 'Elevator Contractor' },
    { value: 'ESCALATOR',       label: 'Escalator Contractor' },
    { value: 'ACCESS_CONTROL',  label: 'Access Control Systems Contractor' },
  ],
  INTERIOR_FINISHING_CONTRACTORS: [
    { value: 'INTERIOR_FITOUT', label: 'Interior Fit-Out Contractor' },
    { value: 'DRYWALL',         label: 'Drywall Contractor' },
    { value: 'CEILING',         label: 'Ceiling Contractor' },
    { value: 'FLOORING',        label: 'Flooring Contractor' },
    { value: 'PAINTING',        label: 'Painting Contractor' },
    { value: 'JOINERY',         label: 'Joinery Contractor' },
    { value: 'CARPENTRY',       label: 'Carpentry Contractor' },
    { value: 'FURNITURE',       label: 'Furniture Contractor' },
  ],
  EXTERNAL_WORKS_CONTRACTORS: [
    { value: 'LANDSCAPING',   label: 'Landscaping Contractor' },
    { value: 'HARDSCAPE',     label: 'Hardscape Contractor' },
    { value: 'ROAD_PAVEMENT', label: 'Road & Pavement Contractor' },
    { value: 'UTILITY',       label: 'Utility Contractor' },
    { value: 'DRAINAGE',      label: 'Drainage Contractor' },
  ],
  SPECIALIZED_CONTRACTORS: [
    { value: 'SURVEYING',           label: 'Surveying Contractor' },
    { value: 'BIM',                 label: 'BIM Contractor' },
    { value: 'TESTING_COMMISSIONING', label: 'Testing & Commissioning Contractor' },
    { value: 'FACADE_ACCESS',       label: 'Façade Access System Contractor (BMU)' },
    { value: 'SOLAR_SYSTEMS',       label: 'Solar Systems Contractor' },
    { value: 'SECURITY_SYSTEMS',    label: 'Security Systems Contractor' },
    { value: 'SMART_HOME',          label: 'Smart Home Systems Contractor' },
  ],
  OPERATIONS_MAINTENANCE: [
    { value: 'FACILITY_MANAGEMENT', label: 'Facility Management Contractor' },
    { value: 'O_AND_M',             label: 'Operations & Maintenance (O&M) Contractor' },
  ],
 
  // Vendors
  STRUCTURAL_CIVIL_VENDORS: [
    { value: 'CEMENT',                   label: 'Cement Vendor' },
    { value: 'RMC',                      label: 'Ready-Mix Concrete (RMC) Vendor' },
    { value: 'REINFORCEMENT_STEEL',      label: 'Reinforcement Steel Vendor' },
    { value: 'STRUCTURAL_STEEL',         label: 'Structural Steel Vendor' },
    { value: 'PRECAST_CONCRETE',         label: 'Precast Concrete Vendor' },
    { value: 'MASONRY_BLOCK',            label: 'Masonry Block Vendor' },
    { value: 'AGGREGATE',                label: 'Aggregate Vendor' },
    { value: 'SAND',                     label: 'Sand Vendor' },
    { value: 'WATERPROOFING_MATERIALS',  label: 'Waterproofing Materials Vendor' },
    { value: 'CONSTRUCTION_CHEMICALS',   label: 'Construction Chemicals Vendor' },
  ],
  ARCHITECTURAL_VENDORS: [
    { value: 'DOORS',            label: 'Doors Vendor' },
    { value: 'WINDOWS',          label: 'Windows Vendor' },
    { value: 'CURTAIN_WALL',     label: 'Curtain Wall Vendor' },
    { value: 'GLASS',            label: 'Glass Vendor' },
    { value: 'CLADDING',         label: 'Cladding Vendor' },
    { value: 'ROOFING_MATERIALS', label: 'Roofing Materials Vendor' },
    { value: 'FLOORING',         label: 'Flooring Vendor' },
    { value: 'CEILING_SYSTEMS',  label: 'Ceiling Systems Vendor' },
    { value: 'PAINT',            label: 'Paint Vendor' },
    { value: 'JOINERY',          label: 'Joinery Vendor' },
    { value: 'FURNITURE',        label: 'Furniture Vendor' },
  ],
  MEP_VENDORS: [
    { value: 'HVAC_EQUIPMENT',   label: 'HVAC Equipment Vendor' },
    { value: 'CHILLER',          label: 'Chiller Vendor' },
    { value: 'COOLING_TOWER',    label: 'Cooling Tower Vendor' },
    { value: 'AHU',              label: 'Air Handling Unit (AHU) Vendor' },
    { value: 'VENTILATION',      label: 'Ventilation Equipment Vendor' },
    { value: 'ELECTRICAL',       label: 'Electrical Vendor' },
    { value: 'TRANSFORMER',      label: 'Transformer Vendor' },
    { value: 'GENERATOR',        label: 'Generator Vendor' },
    { value: 'UPS',              label: 'UPS Vendor' },
    { value: 'LIGHTING',         label: 'Lighting Vendor' },
    { value: 'CABLE',            label: 'Cable Vendor' },
    { value: 'SWITCHGEAR',       label: 'Switchgear Vendor' },
    { value: 'PLUMBING_FIXTURES', label: 'Plumbing Fixtures Vendor' },
    { value: 'PUMPS',            label: 'Pumps Vendor' },
    { value: 'WATER_TANKS',      label: 'Water Tanks Vendor' },
    { value: 'VALVES',           label: 'Valves Vendor' },
  ],
  FIRE_SAFETY_VENDORS: [
    { value: 'FIRE_ALARM',            label: 'Fire Alarm Vendor' },
    { value: 'FIRE_PROTECTION',       label: 'Fire Protection Vendor' },
    { value: 'FIRE_FIGHTING',         label: 'Fire Fighting Equipment Vendor' },
    { value: 'SPRINKLER_SYSTEMS',     label: 'Sprinkler Systems Vendor' },
    { value: 'FIRE_DOORS',            label: 'Fire Doors Vendor' },
    { value: 'EMERGENCY_LIGHTING',    label: 'Emergency Lighting Vendor' },
  ],
  ELV_ICT_VENDORS: [
    { value: 'CCTV',             label: 'CCTV Vendor' },
    { value: 'ACCESS_CONTROL',   label: 'Access Control Vendor' },
    { value: 'ICT',              label: 'ICT Vendor' },
    { value: 'STRUCTURED_CABLING', label: 'Structured Cabling Vendor' },
    { value: 'NETWORK_EQUIPMENT', label: 'Network Equipment Vendor' },
    { value: 'WIFI_SYSTEMS',     label: 'Wi-Fi Systems Vendor' },
    { value: 'INTERCOM',         label: 'Intercom Vendor' },
    { value: 'PA_SYSTEMS',       label: 'Public Address (PA) Vendor' },
    { value: 'AV',               label: 'Audio Visual (AV) Vendor' },
    { value: 'BMS',              label: 'Building Management System (BMS) Vendor' },
    { value: 'SMART_HOME',       label: 'Smart Home Systems Vendor' },
  ],
  VERTICAL_TRANSPORTATION_VENDORS: [
    { value: 'ELEVATOR',  label: 'Elevator Vendor' },
    { value: 'ESCALATOR', label: 'Escalator Vendor' },
    { value: 'BMU',       label: 'Building Maintenance Unit (BMU) Vendor' },
  ],
  EXTERNAL_WORKS_VENDORS: [
    { value: 'LANDSCAPING',      label: 'Landscaping Vendor' },
    { value: 'IRRIGATION',       label: 'Irrigation Systems Vendor' },
    { value: 'STREET_LIGHTING',  label: 'Street Lighting Vendor' },
    { value: 'PAVING_MATERIALS', label: 'Paving Materials Vendor' },
    { value: 'SITE_FURNITURE',   label: 'Site Furniture Vendor' },
  ],
  SPECIALIZED_VENDORS: [
    { value: 'SOLAR_PV',           label: 'Solar PV Vendor' },
    { value: 'BATTERY_STORAGE',    label: 'Battery Storage Vendor' },
    { value: 'FACADE_ACCESS',      label: 'Facade Access Systems Vendor' },
    { value: 'SECURITY_SYSTEMS',   label: 'Security Systems Vendor' },
    { value: 'PARKING_MGMT',       label: 'Parking Management Systems Vendor' },
    { value: 'WASTE_MGMT',         label: 'Waste Management Systems Vendor' },
  ],
  CONSTRUCTION_EQUIPMENT_VENDORS: [
    { value: 'TOWER_CRANE',         label: 'Tower Crane Vendor' },
    { value: 'PASSENGER_HOIST',     label: 'Passenger Hoist Vendor' },
    { value: 'CONCRETE_PUMP',       label: 'Concrete Pump Vendor' },
    { value: 'FORMWORK',            label: 'Formwork Vendor' },
    { value: 'SCAFFOLDING',         label: 'Scaffolding Vendor' },
    { value: 'CONSTRUCTION_MACHINERY', label: 'Construction Machinery Vendor' },
  ],
};
 
// Sub Cat 1 options by Role
export const SUB1_BY_ROLE: Record<string, DropdownOption[]> = {
  CONSULTANTS:          CONSULTANT_SUB1,
  BUILDERS_CONTRACTORS: BUILDER_SUB1,
  VENDORS:              VENDOR_SUB1,
  OTHERS: [{ value: 'USER_DEFINED', label: 'Users Can Define' }],
};
 
// Sub Category 3 — same list for all
export const SUB3_OPTIONS: DropdownOption[] = Object.entries(PROJECT_TYPE_LABELS)
  .map(([value, label]) => ({ value, label }));