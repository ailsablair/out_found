import { type Case } from '../../models/types.js';

export interface FOIARequest {
  state: string;
  agencyName: string;
  requesterName: string;
  caseDetails: string;
  requestType: 'autopsy' | 'body-cam' | 'case-report';
}

export class FOIAGenerator {
  private templates: Record<string, string> = {
    'GA': "To the Open Records Officer of {agencyName}: Pursuant to the Georgia Open Records Act (O.C.G.A. § 50-18-70 et seq.), I hereby request access to and copies of {requestType} records related to {caseDetails}.",
    'CO': "Dear Custodian of Records: Under the Colorado Open Records Act (§ 24-72-201 et seq.), I am requesting {requestType} regarding the following case: {caseDetails}.",
    'SC': "To whom it may concern: This is a request under the South Carolina Freedom of Information Act. I am seeking {requestType} records for {caseDetails}."
  };

  public generateRequest(params: FOIARequest): string {
    const template = this.templates[params.state] || "Pursuant to the applicable Freedom of Information laws, I request {requestType} regarding {caseDetails}.";

    return template
      .replace('{agencyName}', params.agencyName)
      .replace('{requestType}', params.requestType)
      .replace('{caseDetails}', params.caseDetails);
  }
}
