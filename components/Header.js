//Define a React functional component named `Header`
const Header = () => {

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl mb-6 sm:mx-auto sm:text-center md:mb-10 lg:max-w-2xl">
        <div className='max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12'>
          <h2 className='max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none'>
            CUTTING-EDGE BLOCKCHAIN TECHNOLOGY       
          </h2>
          </div> 
        
        <p className="text-base text-gray-700 md:text-lg">
          A platform that allows investors to invest in
          tokens that represent a share of the overall
          investment in transportation-related services.
          These services include freight and logistics,
          delivery services, ride-sharing, and public transportation.
          Investors can earn returns based on the profit generated by these services,
          as well as the appreciation of the value of their tokens.
        </p>
      </div>
     <div className="grid gap-6 row-gap-5 lg:grid-cols-3">
        <div>
          <img
            className="object-cover w-full h-64 mb-6 rounded shadow-lg lg:h-80 xl:h-96"
            src="https://www.freshbooks.com/wp-content/uploads/2022/03/8-steps-to-starting-a-successful-transport-business.jpg"
            alt=""
          />
          <h5 className="mb-2 text-xl font-bold leading-none sm:text-2xl">
            LOGISTICS
          </h5>
          <p className="text-gray-700">
            With the increase in online shopping and global trade,
            there is a high demand for reliable and efficient freight logistics services.
            By investing in TransitFlow, you can contribute to the growth of this industry
            while also generating potential returns on your investment.
            As an investor, you'll have the opportunity to be a part of a dynamic
            industry that is constantly evolving and growing, and benefit from the expertise
            of a team that has a deep understanding of the market.
          </p>
        </div>
        <div>
          <img
            className="object-cover w-full h-64 mb-6 rounded shadow-lg lg:h-80 xl:h-96"
            src="https://media.istockphoto.com/id/1325350394/photo/package-boxes-on-pallets-loading-into-cargo-container-trucks-parked-loading-at-dock-warehouse.jpg?s=612x612&w=0&k=20&c=FtIxuVhGpQeWNPjzlF4domcCwbkZNKFnqVpRGZk4ySs="
            alt=""
          />
          <h5 className="mb-2 text-xl font-bold leading-none sm:text-2xl">
            DELIVERY
          </h5>
          <p className="text-gray-700">
            With the surge in online shopping and same-day delivery demands,
            there is a high demand for reliable and efficient delivery services.
            By investing in TransitFlow, you can contribute to the growth of this industry
            while also generating potential returns on your investment.
            As an investor in our delivery services, you can be confident that your investment
            is being managed by a team of experienced professionals with a proven track record of success.
          </p>
        </div>
        <div>
          <img
            className="object-cover w-full h-64 mb-6 rounded shadow-lg lg:h-80 xl:h-96"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBcqsydAJthR2uOWpZ5XSuuGGl8SvEcUgDjDaZagMdsiHMK-k&s"
            alt=""
          />
          <h5 className="mb-2 text-xl font-bold leading-none sm:text-2xl">
            CAR SHARING AND PUBLIC TRANSPORTATION
          </h5>
          <p className="text-gray-700">
            By investing in our car sharing and public transportation services, you can contribute to
            the growth of a more sustainable and eco-friendly transportation system
            while also generating potential returns on your investment. With a proven
            track record of success and a growing customer base, investing in TransitFlow's car sharing
            and public transportation services can provide a stable and profitable investment opportunity.
          </p>
        </div>
      </div>
    </div>
  );


}
export default Header