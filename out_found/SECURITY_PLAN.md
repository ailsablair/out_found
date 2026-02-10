# Out&Found Long-Term Security & Compliance Plan

This document outlines the technical strategy for maintaining a secure, forensic-grade investigative platform for the 2SLGBTQIA+ community.

## 1. Data Privacy & Compliance
- **GDPR / "Right to be Forgotten"**: Automate digital footprint scrubbing via the Takedown API. Implement "Right to Erasure" workflows for all user-submitted data.
- **NCIC Compliance**: Ensure all case data exports follow the National Crime Information Center standards for seamless law enforcement ingestion.
- **Hague Convention**: Automate "Border-Watch" checklists and legal notification templates for international abduction cases.

## 2. PII Protection (Personally Identifiable Information)
- **Encryption at Rest**: AES-256 for all relational and vector database layers.
- **Key Rotation**: Mandatory annual rotation of master encryption keys using hardware security modules (HSM).
- **Field-Level Security**: Differential access controls based on user role (e.g., Non-Profit vs. Public).

## 3. Resilience & Integrity
- **Audit Trails**: Non-repudiable logging of all case modifications and external API calls.
- **Multi-Source Consensus**: Mandatory validation from at least two independent sources before a case is published.
- **Circuit Breakers**: Prevent cascading failures when external APIs (NamUs, Wayback) are down.

## 4. Forensic Integrity
- **pHash Tracking**: Use perceptual hashing to track the distribution of forensic sketches across the web.
- **Uncertainty Mapping**: Prioritize witness confidence heatmaps in AI-generated renderings to avoid "over-defining" features.

## 5. Community Safety
- **Trafficking Protections**: Restricted visibility for high-risk cases until staff review is complete.
- **Anonymity**: Metadata stripping for whistleblowers and vulnerable family members submitting case intel.
