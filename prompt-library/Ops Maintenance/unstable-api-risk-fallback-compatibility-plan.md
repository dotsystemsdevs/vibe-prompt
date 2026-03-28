# Unstable Api Risk Fallback Compatibility Plan

## Purpose
Create a prompt that manages the risks of alpha/experimental APIs through fallback logic, feature flags, and a clear rollback plan.

## Input
- Experimental API functionality
- Critical dependencies in the app
- Availability/stability requirements

## Instructions
1. Identify which functions depend on the alpha API.
2. Classify risk level per function (low/medium/high).
3. Design fallback behavior when API function is missing or broken.
4. Add feature flags for quick on/off control.
5. Define monitoring and error thresholds for rollback.
6. Deliver a communication plan for users in the event of a degraded state.

## Output Format
- `Alpha Dependency Map`
- ``Risk Matrix''
- ``Fallback Behavior''
- `Feature Flag Plan'
- ``Rollback Criteria''
- ``User Communication Notes''

## Quality Criteria
- Clear operability despite experimental stack
- Fast rollback without panic fixes
- The user gets comprehensible status
- Easy to maintain over API changes

## Variants
- Variant A: Demo-first with accepted instability
- Variant B: Production-lean with strict degradation policy
