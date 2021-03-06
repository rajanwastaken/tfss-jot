import Airtable from 'airtable';
import Head from 'next/head';
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export async function getStaticProps() {
  const airtable = new Airtable({
    apiKey: process.env.API_KEY,
    view: 'Status',
  });

  const records = await airtable
    .base(process.env.BASE_ID)('Resources')
    .select({
      fields: ['Name', 'Link', 'Status', 'Category', 'About', 'Image'],
      view: 'Status',
    })
    .all();

  const products = records.map((sig) => {

    return {
      name: sig.get('Name'),
      type: sig.get('Name'),
      category: sig.get('Category'),
      link: sig.get('Link'),
      status: sig.get('Status'),
      about: sig.get('About'),
      image: sig.get('Image'),
    };
  });

  const terminology = await airtable
    .base(process.env.BASE_ID)('Terminology')
    .select({
      fields: ['Name', 'Definition'],
      view: 'Status',
    })
    .all();

  const definitions = terminology.map((sig) => {

    return {
      term: sig.get('Name'),
      definition: sig.get('Definition'),
    };
  });

  const exam = await airtable
    .base(process.env.BASE_ID)('Exams')
    .select({
      fields: ['Name', 'Details', 'Link'],
      view: 'Status',
    })
    .all();

  const exams = exam.map((sig) => {

    return {
      title: sig.get('Name'),
      explain: sig.get('Details'),
      url: sig.get('Link'),
    };
  });

  return {
    props: {
      definitions,
      products,
      exams,
    },
    revalidate: 60,
  };
}


function Product({ name, about, status, category, link }) {
    function Colours() {
        if(status == 'Case Study') {
            return '#08b445'
        }
        if(status == 'Sample') {
          return '#AA336A'
      }
        if (status == 'Terms') {
            return '#c89809'
        }
        if (status == 'Notes') {
            return '#BF40BF'
        }
    }

    return (
    <div className="max-w-sm rounded-lg border m-3 shadow-md bg-gray-300 border-gray-300">
    <div className="p-5">
        <a href={link}
        style={{
          display: 'flex',
        }}
        >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">{name}</h5>
<div>

 <button className="px-2 mx-2 py-0 -translate-y-0.5 my-2 opacity-0.8 hover:bg-yellow-600 text-white text-sm font-medium rounded-full" 
    style={{
        backgroundColor: Colours(),
    }}
 >
    {status}
 </button>
 </div>
        </a>

        <p className="mb-3 font-normal text-gray-700"><i>{category}</i></p>
        <p className="mb-3 font-normal text-gray-700">{about}</p>
        <a href={link} className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-blue-900 hover:bg-blue-800 focus:ring-blue-800">
            Explore
            <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </a>
    </div>
</div>
  );
}

function Words({ term, definition }) {

  return (
  <div className="max-w-sm rounded-lg border m-3 shadow-md bg-gray-300 border-gray-300">
  <div className="p-5">
      <a href="#"
      style={{
        display: 'flex',
      }}
      >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">{term}</h5>
<div>

</div>
      </a>

      <p className="mb-3 font-normal text-gray-700"><i>{definition}</i></p>
  </div>
</div>
);
}

function ExamLayout({ title, explain, url }) {

  return (
  <div className="max-w-sm rounded-lg border m-3 shadow-md bg-gray-300 border-gray-300">
  <div className="p-5">
      <a href="#"
      style={{
        display: 'flex',
      }}
      >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">{title}</h5>
<div>

</div>
      </a>

      <p className="mb-3 font-normal text-gray-700"><i>{explain}</i></p>
      <a href={url} className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-blue-900 hover:bg-blue-800 focus:ring-blue-800">
            Explore
            <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </a>
  </div>
</div>
);
}

export default function Home({ products, definitions, exams }) {

  return (
    <div className={styles.container}>
      <Head>
      <title>Health Science JOT</title>
        <meta name="description" content="Turner Fenton JOT Health Science Platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <section className="pt-20 lg:pt-[120px] pb-5 lg:pb-5">
   <div className="container">
      <div className="flex flex-wrap justify-center -mx-4">
         <div className="w-full px-4">
            <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[510px]">
               <h2
                  className="
                  font-bold
                  text-3xl
                  sm:text-4xl
                  md:text-[40px]
                  text-black
                  mb-4
                  "
                  >
                 JOT Health Science
               </h2>
              {/* <div className="display-flex">
               <button className="text-black p-3 "><b><Link href="/clubs=name">Name</Link></b></button>
               <button className="text-black p-3"> <Link href="/clubs=status">Status</Link></button>
          </div> */}
            </div>
         </div>
      </div>
   </div>
</section>
        

        <div className={styles.grid}>

        {products.map((sig) => (
          <Product
            key={sig.name}
            name={sig.name}
            type={sig.name}
            category={sig.category}
            link={sig.link}
            heads={sig.heads}
            status={sig.status}
            about={sig.about}
            colour={sig.colour}
            image={sig.image}
          />    
        ))}
        </div>
        <div className="w-full px-4">
            <div className="text-center mx-auto mt-[100px] lg:mb-20 max-w-[510px]">
               <h2
                  className="
                  font-bold
                  text-3xl
                  pt-5
                  mt-5
                  sm:text-4xl
                  md:text-[40px]
                  text-black
                  
                  "
                  >
                 Terminology
               </h2>

            </div>
         </div>
        <div className={styles.grid}>

        {definitions.map((sig) => (
          <Words
            key={sig.term}
            term={sig.term}
            definition={sig.definition}
          />    
        ))}
        </div>

        <div className="w-full px-4">
            <div className="text-center mx-auto mt-[100px] lg:mb-20 max-w-[510px]">
               <h2
                  className="
                  font-bold
                  text-3xl
                  pt-5
                  mt-5
                  sm:text-4xl
                  md:text-[40px]
                  text-black
                  
                  "
                  >
                 Exams & Cases
               </h2>

            </div>
         </div>
        <div className={styles.grid}>

        {exams.map((sig) => (
          <ExamLayout
            key={sig.title}
            title={sig.title}
            explain={sig.explain}
            url={sig.url}
          />    
        ))}
        </div>

        
      </main>
    </div>
  )
}

