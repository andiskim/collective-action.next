import { Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { NextPage } from 'next';
import React from 'react';
import Card from '../components/Card';

const Explore: NextPage = () => {
  return (
    <>
      <Box as='h1' textAlign={'center'} mt="30px">
        <Heading>
          Explore
        </Heading>
      </Box>
      <Box textAlign="center" ml="auto" mr="auto" mt="40px">
        <Tabs variant='soft-rounded' colorScheme='green'>
          <TabList display="flex" justifyContent="center">
            <Tab mr="10px">All</Tab>
            <Tab mr="10px">Active</Tab>
            <Tab mr="10px">In Dispute</Tab>
            <Tab mr="10px">Completed</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box display="flex" flexDirection="row" justifyContent={'space-evenly'} width="1400px" ml="auto" mr="auto" py="20px">
                <Card
                  title={"Title Testing"}
                  description={"Description Testing foaijsd foaisdj aoisj fasoijf asoidjf aosijf aosidjf aoisj aiofsdj oaisdj aoijfawoijf f"}
                  profile_url="https://www.penthousepantherclub.com/pharaoh_small.png"
                  profile_name="Andrew Test"
                  type={"Charity"}
                  current_value_in_usd={10000}
                  total_value_in_usd={15000}
                />
                <Card
                  title={"Title Testing"}
                  description={"Description Testing foaijsd foaisdj aoisj fasoijf asoidjf aosijf aosidjf aoisj aiofsdj oaisdj aoijfawoijf f"}
                  profile_url="https://www.penthousepantherclub.com/pharaoh_small.png"
                  profile_name="Andrew Test"
                  type={"Charity"}
                  current_value_in_usd={10000}
                  total_value_in_usd={15000}
                />
                <Card
                  title={"Title Testing"}
                  description={"Description Testing foaijsd foaisdj aoisj fasoijf asoidjf aosijf aosidjf aoisj aiofsdj oaisdj aoijfawoijf f"}
                  profile_url="https://www.penthousepantherclub.com/pharaoh_small.png"
                  profile_name="Andrew Test"
                  type={"Charity"}
                  current_value_in_usd={10000}
                  total_value_in_usd={15000}
                />
                <Card
                  title={"Title Testing"}
                  description={"Description Testing foaijsd foaisdj aoisj fasoijf asoidjf aosijf aosidjf aoisj aiofsdj oaisdj aoijfawoijf f"}
                  profile_url="https://www.penthousepantherclub.com/pharaoh_small.png"
                  profile_name="Andrew Test"
                  type={"Charity"}
                  current_value_in_usd={10000}
                  total_value_in_usd={15000}
                />
              </Box>
            </TabPanel>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  )
}

export default Explore;
