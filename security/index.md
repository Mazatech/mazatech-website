---
layout: security
title: ESCHER security policy
permalink: /security/
---

# ESCHER security policy

This is the coordinated vulnerability disclosure (CVD) policy of ESCHER, the 2D vector graphics library of Mazatech S.r.l. It is published at <https://www.mazatech.com/security/>; the security contact of the domain `mazatech.com` is <https://www.mazatech.com/.well-known/security.txt>. Vulnerabilities are disclosed according to ISO/IEC 29147 and handled according to ISO/IEC 30111.

## Reporting a vulnerability

Write to `security@mazatech.com`, encrypted with the OpenPGP key of that address:

- Key: <https://www.mazatech.com/security/pgp-key.asc>
- Fingerprint: `6079 67AC 92E9 DB96 C3E3  7754 1DD5 A52E B776 3BA3`

Check the fingerprint before you encrypt. Write in English or Italian, and include what you have of:

- the affected release (`v<X.Y.Z>`) or commit, and the build configuration;
- the input or the steps that reproduce the issue: a scene, a path, a program;
- the impact you observed or expect;
- a CVSS v4.0 vector;
- whether and how you wish to be credited.

Do not report a vulnerability through a public channel.

## Scope

The commitments of this policy cover the ESCHER library: the source code releases `v<X.Y.Z>` of every major line within its support period (see "Support period"), the current development line, and the code derived from third-party sources that ships with the library (listed in `THIRD_PARTY_NOTICES`).

Outside these commitments:

- other products and services of Mazatech S.r.l.: report them to the same address; they are handled with best effort, without the response targets below;
- the tools that build and verify ESCHER (compilers, analysers, build infrastructure): report a vulnerability of such a tool to its supplier;
- releases whose support period has ended.

## Response targets

| Step | Target |
|---|---|
| Acknowledgement | within 2 business days of the report |
| Triage | within 7 business days of the report: the issue is confirmed or rejected, and scored with CVSS v4.0 |
| Fix | within 90 days of the triage, earlier by severity |

Business days are Monday to Friday, public holidays in Italy excluded. Every report is tracked in a private security issue tracker from its receipt to the publication of the fix. You are told the outcome of the triage and kept informed until the fix is published.

## Coordinated disclosure

- The details of a report stay confidential between you and Mazatech S.r.l. until the fix is published; the date of publication is agreed with you. Please do not disclose them before that date.
- If the fix target cannot be met, you are told why, and a new date is agreed with you.
- The fix ships as a patch release of every supported major line that the vulnerability affects, together with a CSAF 2.0 advisory and a CVE identifier; a VEX statement covers the releases that are not affected.
- Customers registered for an affected release are notified on the day of publication.
- With your agreement, the advisory credits you.

## Safe harbour

Mazatech S.r.l. will not take legal action against, nor ask any authority to act against, anyone who, in good faith:

- researches a vulnerability of ESCHER on their own copy or installation, without accessing, modifying, or deleting data of others and without disrupting services of others;
- reports it as described in "Reporting a vulnerability" and keeps it confidential until the agreed date of publication;
- asks for no payment or other consideration as a condition of the report or of its confidentiality.

If a third party takes legal action against you for an activity carried out within this policy, Mazatech S.r.l. will state that the activity complied with it. This statement covers the rights of Mazatech S.r.l. only; it cannot authorise research on systems of others.

## Advisories and updates

- Advisories are published together with the fix, in CSAF 2.0, and are included in the customer package of the fixed release.
- Updates are distributed as signed source code releases: a signed tag and a signed archive. The user information of each release explains how to verify the signature and the provenance.

## Support period

Each major line is supported for 5 years from its first release `v<MAJOR>.0.0`. During that period, security fixes are provided free of charge as patch releases of the latest minor release of the line; a customer on an earlier minor release of the same major line upgrades without an API change. End of support is announced 12 months in advance in the changelog and in the advisories. The end date of a line is also stated in the user information and in the changelog of every release of that line.

| Major line | First release | End of support | End announced by |
|---|---|---|---|
| — | no release yet | — | — |
