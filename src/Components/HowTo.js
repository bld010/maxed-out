import React from 'react';

const HowTo = () => {
  return(
    <>
    <div>
      <h2>Is my favored presidential candidate accepting donations from organizations that align with my views?</h2>
      <h2>Is my representative beholden to a certain industry? </h2>
      <h2>What types of individuals are supporting my senator?</h2>
      <p>Maxed-Out's mission is to get voters thinking about the money spent on
        federal political campaigns. You'll be able to see individuals and organizations
        that make the maximum allowable donations to a given campaign according to federal law. 
      </p>
    </div>
    <div>
      <h3>Here's how:</h3>
      <ul>
        <li>Search for a candidate by name.</li>
        <li>If a candidate has run for more than one federal office, select which
          campaign you're interested in. </li> 
        <li>Campaign spending is done through campaign committees that are direclty associated
          with a candidate's campaign. Sometimes there are more than one. Choose one to see which
          individuals and Political Action Committees (PACs) are donating the maximum allowable amount
          to a given campaign. 
        </li>
      </ul>
    </div>
    <div>
      <p>Note: Individuals are limited to $2,800 per campaign, while PACs are limited to $5000 per campaign. 
        Donations from local/district/state/national party committees are subject to higher limits. 
        <a href="https://www.fec.gov/introduction-campaign-finance/understanding-ways-support-federal-candidates/"
          target="_blank" rel="noopener noreferrer">
        (Read more about federal campaign finance law on the Federal Election Commission's Website)</a></p>
    </div>
    <div className="faq">
      <h3>Did you know?</h3>
      <p>Not all election spending is targeted to a specific candidate's campaign. </p>
      <p>While Maxed-Out uses public information from the Federal Election Commission,
        it can only show donations made directly to a campaign committee.
      </p>
      <p>Hundreds of millions of dollars are spent to support or defeat political campaigns
        by organizations that do not need to disclose their donors due to being classified as 
        non-profit. 
      </p>
      <p>So called Super-PACs are one classification of organizations that can raise
        unlimited, undisclosed donations, but may not donate to or coordinate directly with
        a particular campaign. 
        <a href="https://www.opensecrets.org/pacs/superpacs.php" target="_blank" rel="noopener noreferrer">
        (Read more about Super-PACs on OpenSecrets.org.)</a>
      </p>
    </div>
    
    </>
  )
}

export default HowTo;

