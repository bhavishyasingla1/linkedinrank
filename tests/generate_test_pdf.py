import os

def create_valid_pdf(filename):
    # Minimal 100% compliant PDF 1.4 specification
    lines = [
        "Alex Mercer",
        "Staff Software Engineer at Stripe | Distributed Systems & Cloud Infrastructure",
        "San Francisco, California, United States",
        "Summary",
        "Experienced platform engineer leading distributed ledger architecture across high-throughput services.",
        "Experience",
        "Stripe",
        "Staff Software Engineer",
        "January 2021 - Present (3 years 2 months)",
        "San Francisco, CA",
        "Led architecture of core ledger processing 50M daily transactions with 99.999% uptime.",
        "Top Skills",
        "Go (Golang)",
        "Kubernetes",
        "Distributed Systems",
        "Education",
        "University of California, Berkeley",
        "Bachelor of Science, Computer Science"
    ]

    stream_content = "BT\n/F1 12 Tf\n50 720 Td\n15 TL\n"
    for line in lines:
        escaped = line.replace("(", "\\(").replace(")", "\\)")
        stream_content += f"({escaped}) '\n"
    stream_content += "ET\n"
    
    stream_bytes = stream_content.encode('utf-8')
    stream_len = len(stream_bytes)

    pdf = bytearray()
    pdf.extend(b"%PDF-1.4\n")
    
    # 1: Catalog
    o1 = len(pdf)
    pdf.extend(b"1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n")
    
    # 2: Pages
    o2 = len(pdf)
    pdf.extend(b"2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n")
    
    # 3: Page
    o3 = len(pdf)
    pdf.extend(b"3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n")
    
    # 4: Contents
    o4 = len(pdf)
    pdf.extend(f"4 0 obj\n<< /Length {stream_len} >>\nstream\n".encode('utf-8'))
    pdf.extend(stream_bytes)
    pdf.extend(b"\nendstream\nendobj\n")
    
    # 5: Font
    o5 = len(pdf)
    pdf.extend(b"5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n")
    
    # xref
    xref_pos = len(pdf)
    pdf.extend(b"xref\n0 6\n0000000000 65535 f \n")
    pdf.extend(f"{o1:010d} 00000 n \n".encode('utf-8'))
    pdf.extend(f"{o2:010d} 00000 n \n".encode('utf-8'))
    pdf.extend(f"{o3:010d} 00000 n \n".encode('utf-8'))
    pdf.extend(f"{o4:010d} 00000 n \n".encode('utf-8'))
    pdf.extend(f"{o5:010d} 00000 n \n".encode('utf-8'))
    
    pdf.extend(b"trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n")
    pdf.extend(f"{xref_pos}\n%%EOF\n".encode('utf-8'))

    with open(filename, 'wb') as f:
        f.write(pdf)
    print(f"Generated {filename} ({len(pdf)} bytes)")

if __name__ == '__main__':
    create_valid_pdf('test_linkedin_profile.pdf')
