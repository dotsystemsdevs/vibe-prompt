# Desktop + Web App Handoff (Tauri, Next.js, SaaS)

## Purpose

Produce a reusable prompt that aligns the desktop app prompt flow with web app accounts, licensing, and backend so the system stays coherent.

## Input

- Desktop capabilities (local prompt handling)
- Web app capabilities (auth, license, billing, backend)
- Environment requirements and deployment targets

## Instructions

1. Map responsibilities between desktop and web app without overlap.
2. Define which data stays local versus cloud-backed.
3. Define handoff points between client interaction and the SaaS backend.
4. Describe error handling when the desktop is offline or license state is unclear.
5. Propose a phased implementation pace: MVP, hardening, scale.
6. Close with a clear integration checklist.

## Output Format

- `Responsibility Split`
- `Data Boundary Rules`
- `Desktop-Web Handoff Flow`
- `Failure Modes & Recovery`
- `Integration Checklist`

## Quality Criteria

- Clear system boundary between app surfaces
- Lower risk of multiple sources of truth
- Realistic phasing
- Operable and supportable architecture

## Variants

- **Variant A:** Offline-first desktop with delayed sync.
- **Variant B:** License-first, web-controlled desktop experience.
