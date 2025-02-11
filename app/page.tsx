'use client'

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Copy } from "lucide-react"
import MySvg from "./Focused_Card_Backgound_Pink.svg"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export default function Component() {
  const [service, setService] = useState("")
  const [region, setRegion] = useState("")
  const [environment, setEnvironment] = useState("")
  const [appName, setAppName] = useState("")
  const [subnet, setSubnet] = useState("")
  const [generatedName, setGeneratedName] = useState("")
  const { toast } = useToast()

  const generateName = () => {
    if (!service || !region || !environment || !appName) {
      toast({
        title: "Missing Values",
        description: "Please fill all the feilds",
      })
      return;
    }

    const nameParts = [service, region];
  
    if (subnet) {
      nameParts.push(subnet);
    }
  
    nameParts.push(environment, appName);
  
    const name = nameParts.filter(Boolean).join("-");
    setGeneratedName(name);
  };
  

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedName)
    toast({
      title: "Copied",
      description: "Copied to clipboard",
    })
  }

  useEffect(() => {
    if (service !== 'vpc' && service !== 'nat' && service !== 'rt' && service !== 'subnet') {
      setSubnet(""); 
    }
  }, [service]);

  const regionList = [
    { regionName: "N. Virginia", regionCode: "us-east-1" },
    { regionName: "Ohio", regionCode: "us-east-2" },
    { regionName: "Oregon", regionCode: "us-west-2" },
    { regionName: "N. California", regionCode: "us-west-1" },
    { regionName: "Canada (Central)", regionCode: "ca-central-1" },
    { regionName: "São Paulo", regionCode: "sa-east-1" },
    { regionName: "Ireland", regionCode: "eu-west-1" },
    { regionName: "London", regionCode: "eu-west-2" },
    { regionName: "Paris", regionCode: "eu-west-3" },
    { regionName: "Frankfurt", regionCode: "eu-central-1" },
    { regionName: "Stockholm", regionCode: "eu-north-1" },
    { regionName: "Tokyo", regionCode: "ap-northeast-1" },
    { regionName: "Seoul", regionCode: "ap-northeast-2" },
    { regionName: "Mumbai", regionCode: "ap-south-1" },
    { regionName: "Singapore", regionCode: "ap-southeast-1" },
    { regionName: "Sydney", regionCode: "ap-southeast-2" },
    { regionName: "Osaka", regionCode: "ap-northeast-3" },
  ];

  const serviceList = [
    { serviceValue: "cloudformation", serviceName: "CloudFormation" },
    { serviceValue: "cloudfront", serviceName: "CloudFront" },
    { serviceValue: "cloudwatch", serviceName: "CloudWatch" },
    { serviceValue: "dynamodb", serviceName: "DynamoDB" },
    { serviceValue: "ec2", serviceName: "EC2" },
    { serviceValue: "elasticache", serviceName: "ElastiCache" },
    { serviceValue: "ecs", serviceName: "ECS" },
    { serviceValue: "iam", serviceName: "IAM" },
    { serviceValue: "kinesis", serviceName: "Kinesis" },
    { serviceValue: "lambda", serviceName: "Lambda" },
    { serviceValue: "rds", serviceName: "RDS" },
    { serviceValue: "redshift", serviceName: "Redshift" },
    { serviceValue: "routing-table", serviceName: "Routing Table" },
    { serviceValue: "s3", serviceName: "S3" },
    { serviceValue: "s3-bucket", serviceName: "S3 Bucket" },
    { serviceValue: "sagemaker", serviceName: "SageMaker" },
    { serviceValue: "sgr", serviceName: "Security Group" },
    { serviceValue: "sns", serviceName: "SNS" },
    { serviceValue: "sqs", serviceName: "SQS" },
    { serviceValue: "vpc", serviceName: "VPC" }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#19105B] p-4 relative overflow-hidden">
      <MySvg className="absolute inset-0 w-full h-full object-cover" />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md relative z-10"
      >
        <h1 className="text-3xl font-bold text-[#19105B] mb-6 text-center">AWS Naming Convention</h1>
        <div className="space-y-4">
          <div className="form-group">
            <label htmlFor="service" className="block text-sm font-medium text-[#19105B] mb-1">
              Service
            </label>
            <Select value={service} onValueChange={setService}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {serviceList.map((service) => (
                  <SelectItem key={service.serviceValue} value={service.serviceValue}>
                    {service.serviceName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="form-group">
            <label htmlFor="region" className="block text-sm font-medium text-[#19105B] mb-1">
              Region
            </label>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a region" />
              </SelectTrigger>
              <SelectContent>
              {regionList.map((region) => (
                <SelectItem key={region.regionCode} value={region.regionCode}>
                  {region.regionName}
                </SelectItem>
              ))}
            </SelectContent>
            </Select>
          </div>
          <div className="form-group">
            <label htmlFor="az" className="block text-sm font-medium text-[#19105B] mb-1">
              Environment
            </label>
            <Select value={environment} onValueChange={setEnvironment}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Environment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dev">Dev</SelectItem>
                <SelectItem value="uat">UAT</SelectItem>
                <SelectItem value="test">Test</SelectItem>
                <SelectItem value="stg">Staging</SelectItem>
                <SelectItem value="prod">Production</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="form-group">
            <label htmlFor="app" className="block text-sm font-medium text-[#19105B] mb-1">
              App Name
            </label>
            <input
              type="text"
              name="app"
              id="app"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF6196] focus:border-[#FF6196] sm:text-sm"
              placeholder="Enter app name"
            />
          </div>
          {(service === 'vpc' || service === 'nat'|| service === 'rt'|| service === 'subnet') &&(
            <div className="form-group">
              <label htmlFor="subnet" className="block text-sm font-medium text-[#19105B] mb-1">
                Subnet
              </label>
              <Select value={subnet} onValueChange={setSubnet}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a subnet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        <div className="mt-6">
          <button
            onClick={generateName}
            className="w-full bg-[#FF6196] text-white py-2 px-4 rounded-md hover:bg-[#FF6196]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6196] transition-colors duration-200"
          >
            Generate Name
          </button>
        </div>
        {generatedName && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <label htmlFor="generatedName" className="block text-sm font-medium text-[#19105B] mb-1">
              Generated Name
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <div className="relative flex items-stretch flex-grow focus-within:z-10">
                <Input
                  type="text"
                  id="generatedName"
                  value={generatedName}
                  readOnly
                  className="block w-full rounded-none rounded-l-md border-gray-300 focus:border-[#FF6196] focus:ring-[#FF6196] sm:text-sm"
                />
              </div>
              <button
                type="button"
                onClick={copyToClipboard}
                className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-[#FF6196] focus:border-[#FF6196]"
              >
                <Copy className="h-5 w-5 text-gray-400" />
                <span>Copy</span>
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
