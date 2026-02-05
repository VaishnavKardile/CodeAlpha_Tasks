from scapy.all import sniff, IP, TCP, UDP, IPv6
from datetime import datetime

def analyze_packet(packet):
    print("\nTime:", datetime.now())

    # Check for IPv4
    if IP in packet:
        print("IP Version: IPv4")
        print("Source IP:", packet[IP].src)
        print("Destination IP:", packet[IP].dst)

    # Check for IPv6
    elif IPv6 in packet:
        print("IP Version: IPv6")
        print("Source IP:", packet[IPv6].src)
        print("Destination IP:", packet[IPv6].dst)

    # Check protocol type
    if TCP in packet:
        print("Protocol: TCP")
        print("Source Port:", packet[TCP].sport)
        print("Destination Port:", packet[TCP].dport)
        print("Payload:", bytes(packet[TCP].payload))

    elif UDP in packet:
        print("Protocol: UDP")
        print("Source Port:", packet[UDP].sport)
        print("Destination Port:", packet[UDP].dport)
        print("Payload:", bytes(packet[UDP].payload))

    else:
        print("Protocol: Other")

    print("-" * 60)

print("Starting packet capture...")
sniff(prn=analyze_packet, count=20)
print("Packet capture completed.")
