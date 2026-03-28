# Natural Language To Code Contract Template

## Purpose
Create a contract-based prompt template for natural-language-to-code where requirements, boundaries and output are explicitly defined.

## Input
- Problemformulering i naturligt sprak
- Malplattform/sprak
- Begransningar (prestanda, bibliotek, testnivaa)

## Instructions
1. Translated natural speech into formal requirements in bullet form.
2. Define non-goals to reduce scope creep.
3. Set exact output contract: files, functions, test cases, format.
4. Requirements for acceptance log before implementation.
5. Add verification blocks with pass/fail criteria.
6. Requests rework plan if criteria are not met.

## Output Format
- ``Requirements Contract''
- ``Non-Goals''
- ``Implementation Contract''
- ``Assumptions Log''
- ``Verification Contract''
- ``Rework Plan''

## Quality Criteria
- Clear requirement interpretation
- High sparability between text and code
- Less risk of hallucinated implementation
- Ready to use in CI regular river

## Variants
- Variant A: One function, one file, one test
- Variant B: Multi-file feature with integration test and docs
