"use client"
// components/Canvas.tsx
import React, { useState } from 'react';

interface Subnet {
  id: number;
  name: string;
}

interface VPC {
  id: number;
  name: string;
  subnets: Subnet[];
}

const Canvas: React.FC = () => {
  const [vpcs, setVPCs] = useState<VPC[]>([]);

  const addVPC = () => {
    setVPCs((prevVPCs) => [
      ...prevVPCs,
      { id: Date.now(), name: `VPC ${prevVPCs.length + 1}`, subnets: [] }
    ]);
  };

  const addSubnet = (vpcId: number) => {
    setVPCs((prevVPCs) =>
      prevVPCs.map((vpc) =>
        vpc.id === vpcId
          ? {
              ...vpc,
              subnets: [
                ...vpc.subnets,
                { id: Date.now(), name: `Subnet ${vpc.subnets.length + 1}` }
              ]
            }
          : vpc
      )
    );
  };

  return (
    <div>
      <button onClick={addVPC}>Add VPC</button>
      <div className="canvas">
        {vpcs.map((vpc) => (
          <div key={vpc.id} className="vpc-box">
            <h3>{vpc.name}</h3>
            <button onClick={() => addSubnet(vpc.id)}>Add Subnet</button>
            <div className="subnet-container">
              {vpc.subnets.map((subnet) => (
                <div key={subnet.id} className="subnet-box">
                  {subnet.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Canvas;
