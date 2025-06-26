import pandas as pd

# Create sample cable-port mapping data
data = {
    'Name': [
        'Ethernet Cable Blue',
        'Power Cable Red', 
        'Fiber Optic Cable Yellow',
        'USB Cable Black',
        'HDMI Cable White',
        'Network Cable Green',
        'Console Cable Gray',
        'Patch Cable Orange'
    ],
    'Port 1': [
        'Switch-A Port 1',
        'PDU Port 3',
        'Router Port 2', 
        'Server USB 1',
        'Display Port 1',
        'Switch-B Port 5',
        'Console Port',
        'Patch Panel A1'
    ],
    'Port 2': [
        'Server NIC 1',
        'Server Power 1',
        'Switch Fiber 1',
        'Device USB',
        'Monitor HDMI',
        'Router LAN 2',
        'Management Port',
        'Switch Port 12'
    ]
}

# Create DataFrame and save to Excel
df = pd.DataFrame(data)
df.to_excel('Cables-ports.xlsx', index=False)
print("Sample Cables-ports.xlsx file created successfully!")
print("\nSample data:")
print(df.to_string(index=False))